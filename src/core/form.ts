import { message } from "antd";
import { connect } from "react-redux";
import { reduxForm, ConfigProps } from "redux-form";
import { compose } from "recompose";

import preventUnsaved from "../components/PreventUnsaved";

import { save, SubmissionState } from "../ducks/submission";

import { getMajorFromPath } from "./util";
import logger from "./log";
import { SubmissionFormData } from "./types";

import { store } from "../common/App";

export interface Fields extends SubmissionFormData {
  photo: string;
  disease: string;
  foodAllergy: string;
  drugAllergy: string;
}

type ErrorMessages<T> = { [K in keyof T]?: string };

const personalFields: (keyof Fields)[] = [
  "firstname",
  "lastname",
  "nickname",
  "gender",
  "birthdate",
  "socialMedia",
  "religion",
  "class",
  "school",
  "address",
  "phone",
  "email",
  "shirtSize",
  "activity",
  "expectation",
  "bloodGroup"
];

const parentFields: (keyof Fields)[] = [
  "parentFirstName",
  "parentLastName",
  "parentRelation",
  "parentPhone"
];

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const phoneRegex = /^\d{10}$/;

function validate(values: Partial<Fields>) {
  const major = getMajorFromPath();
  const errors: ErrorMessages<Fields> = {};
  const generalQuestionFields: (keyof Fields)[] = [
    "generalAnswer1",
    "generalAnswer2",
    "generalAnswer3"
  ];

  const majorQuestionFields: (keyof Fields)[] = [
    "majorAnswer1",
    "majorAnswer2",
    "majorAnswer3",
  ];
  if (major === "design" ) {
    majorQuestionFields.push("majorAnswer4");
  }
  const requiredFields = [...personalFields, ...parentFields];
  const questionFields = [...generalQuestionFields, ...majorQuestionFields];
  if (!values.photo) {
    errors.photo = "กรุณาอัพโหลดรูปภาพ";
  }

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "จำเป็น";
    }
  });

  questionFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "กรุณาตอบคำถามดังกล่าว";
    }
  });

  if (!emailRegex.test(values.email || "")) {
    errors.email = "ที่อยู่อีเมลไม่ถูกต้อง";
  }

  if (!phoneRegex.test(values.phone || "")) {
    errors.phone = "เบอร์โทรศัพท์ไม่ถูกต้อง";
  }

  if (!phoneRegex.test(values.parentPhone || "")) {
    errors.parentPhone = "เบอร์โทรศัพท์ไม่ถูกต้อง";
  }
  return errors;
}

function onSubmitFail(error: ErrorMessages<Fields>) {
  const submission: SubmissionState = store.getState().submission;

  if (submission.shouldProceed) {
    message.error("กรุณากรอกข้อมูลให้ครบถ้วน");
  }

  logger.warn("Encountered Validation Error:", error);
}

export const formOptions: ConfigProps = {
  form: "submission",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  onSubmitFail
};

const mapStateToProps = state => ({
  initialValues: state.camper,
  major: state.camper.major
});

const enhance = compose<any, any>(
  connect(
    mapStateToProps,
    { save }
  ),
  reduxForm(formOptions),
  preventUnsaved("submission")
);

export default enhance;
