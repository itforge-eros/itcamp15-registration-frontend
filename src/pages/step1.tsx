import React from "react";
import { connect } from "react-redux";
import styled from "@emotion/styled";

import { Backdrop } from "../components/Layout";
import PersonalForm from "../components/PersonalForm";

import { save, markNext } from "../ducks/submission";
import Stepper from "../components/Stepper";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import ChangeMajorButton from "../components/ChangeMajorButton";

const StepOne = ({ save, markNext }) => (
  <Backdrop>
    <NavBar />
    <Stepper
      currentStep={"ข้อมูลนักเวทย์"}
      steps={["ข้อมูลนักเวทย์", "ข้อมูลเพิ่มเติม", "คำถามกลาง", "คำถามสาขา"]}
    />
    <Title>ข้อมูลนักเวทย์</Title>
    <PersonalForm onSubmit={save} next={markNext} />
  </Backdrop>
);

const enhance = connect(
  null,
  { save, markNext }
);

export default enhance(StepOne);
