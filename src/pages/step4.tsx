import React from "react";
import { connect } from "react-redux";
import styled from "@emotion/styled";
import { withRouteData } from "react-static";

import { Backdrop } from "../components/Layout";
import MajorForm from "../components/MajorForm";

import { save, markNext } from "../ducks/submission";
import Title from "../components/Title";
import Stepper from "../components/Stepper";
import NavBar from "../components/NavBar";

const StepOne = ({ questions, save, markNext }) => (
  <Backdrop>
    <NavBar />
    <Title>คำถามสาขา</Title>
    <Stepper
      currentStep={"คำถามสาขา"}
      steps={["ข้อมูลนักเวทย์", "ข้อมูลเพิ่มเติม", "คำถามกลาง", "คำถามสาขา"]}
    />
    <MajorForm onSubmit={save} next={markNext} questions={questions}/>
  </Backdrop>
);

const enhance = connect(
  null,
  { save, markNext }
);

export default enhance(StepOne);
