import React, { Fragment } from "react";

import { FormContainer, Row, Paper } from "./Layout";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
import TextArea from "./TextArea";
import DatePicker from "./DatePicker";
import { UploadField } from "./Upload";

import withWizard from "../core/form";
import { next } from "../core/step";
import styled from "@emotion/styled";
import RadioGroup from "./RadioGroup";
import ChangeMajorButton from "./ChangeMajorButton";
import TransparentButton from "./TransparentButton";

const Underline = styled.div`
  content: "";
  width: 100%;
  height: 1px;
  margin-top: 5em;
  margin-bottom: 5em;
  bottom: 0;
  left: 0;
  background-color: #e0e0e0;
`;

const toOptions = i => ({ value: i, label: i });

const Options = options =>
  Object.entries(options).map(([value, label]) => ({ value, label }));

export const religions = {
  atheist: "ไม่นับถือศาสนา",
  buddhist: "ศาสนาพุทธ",
  christianity: "ศาสนาคริสต์",
  islam: "ศาสนาอิสลาม",
  other: "ศาสนาอื่นๆ"
};

export const grades = {
  m3: "ม.3 ขึ้น ม.4",
  m4: "ม.4 ขึ้น ม.5",
  m5: "ม.5 ขึ้น ม.6",
  m6: "ม.6 จบการศึกษา"
};

export const genders = {
  male: "ชาย",
  female: "หญิง",
  other: "เพศอื่นๆ"
};

export const shirtSizes = {
  XS: "XS (รอบอก 31 นิ้ว ความยาว 25 นิ้ว)",
  S: "S (รอบอก 36 นิ้ว ความยาว 28 นิ้ว)",
  M: "M (รอบอก 38 นิ้ว ความยาว 28.5 นิ้ว)",
  L: "L (รอบอก 42 นิ้ว ความยาว 30 นิ้ว)",
  XL: "XL (รอบอก 44 นิ้ว ความยาว 30.5 นิ้ว)",
  XXL: "XXL (รอบอก 48 นิ้ว ความยาว 32 นิ้ว)"
};

const religionOptions = Options(religions);
const gradeOptions = Options(grades);
const genderOptions = Options(genders);

// prettier-ignore
const bloodGroups = ['O+', 'O−', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(toOptions)

const Col = styled.div`
  padding: 0px 0.5em;
  width: 100%;
`;

const PersonalForm = ({ next, handleSubmit, isDisabled = false }) => (
  <FormContainer onSubmit={handleSubmit}>
    <Paper>
      <UploadField name="photo" />

      <Row>
        <Col>
          <Input wordy name="firstname" label="ชื่อ" placeholder="แฮรี่" />
        </Col>
        <Col>
          <Input
            wordy
            name="lastname"
            label="นามสกุล"
            placeholder="พ็อตเตอร์"
          />
        </Col>
        <Col>
          <Input wordy name="nickname" label="ชื่อเล่น" placeholder="เจมส์" />
        </Col>
      </Row>

      <Row>
        <Col>
          <DatePicker name="birthdate" label="วันเกิด" wordy />
        </Col>
        <Col>
          <RadioGroup
            wordy
            direction="row"
            name="gender"
            label="เพศ"
            options={genderOptions}
          />
        </Col>
      </Row>

      <Row>
        <Col style={{ justifySelf: "flex-start", alignSelf: "flex-start" }}>
          <Row>
            <Select
              i
              wordy
              name="religion"
              label="ศาสนา"
              options={religionOptions}
              placeholder="พุทธ, คริสต์, อิสลาม, ฯลฯ"
            />
          </Row>
          <Row>
            <Input
              wordy
              name="school"
              label="โรงเรียน"
              placeholder="ฮอกวอตส์วิทยาคม"
            />
          </Row>
        </Col>
        <Col>
          <RadioGroup
            wordy
            direction="column"
            label="ระดับชั้น"
            name="class"
            options={gradeOptions}
          />
          {/* <Select
            i
            name="class"
            label="ระดับชั้น"
            options={gradeOptions}
          /> */}
        </Col>
      </Row>
      <Underline />
      <Row>
        <Col>
          <TextArea
            wordy
            placeholder="บ้านเลขที่, ถนน, แขวง, เขต ฯลฯ"
            name="address"
            label="ถิ่นที่อยู่"
          />
        </Col>
        <Col style={{ alignSelf: "flex-start", justifySelf: "flex-start" }}>
          <Row>
            <Input
              wordy
              name="phone"
              label="เบอโทรศัพท์มือถือ"
              placeholder="0931354239"
            />
          </Row>
          <Row>
            <Input
              wordy
              name="email"
              label="อีเมล"
              placeholder="abc_def@xyz.klm"
            />
          </Row>
        </Col>
      </Row>
    </Paper>

    <Fragment>
      <Row style={{ marginBottom: "2em" }}>
        {/* <TransparentButton disabled>ขั้นตอนก่อนหน้า</TransparentButton> */}

        <Button onClick={next} type="submit" arrow="right">
          ถัดไป
        </Button>
      </Row>
      <Row style={{ marginBottom: "2.8em" }}>
        <ChangeMajorButton />
      </Row>
    </Fragment>
  </FormContainer>
);

export default withWizard(PersonalForm);
