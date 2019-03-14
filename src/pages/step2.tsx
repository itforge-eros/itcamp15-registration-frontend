import React from "react";
import { connect } from "react-redux";
import styled from "@emotion/styled";

import { Backdrop } from "../components/Layout";
import ParentalForm from "../components/ParentalForm";

import { save, markNext } from "../ducks/submission";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import Stepper from "../components/Stepper";
import Button from "../components/Button";
import ChangeMajorButton from "../components/ChangeMajorButton";

const StepOne = ({ save, markNext, clearMajor }) => {
  return (
    <Backdrop>
      <NavBar />
      <Title>ข้อมูลเพิ่มเติม</Title>
      <Stepper
        currentStep={"ข้อมูลเพิ่มเติม"}
        steps={["ข้อมูลนักเวทย์", "ข้อมูลเพิ่มเติม", "คำถามกลาง", "คำถามสาขา"]}
      />
      <ParentalForm onSubmit={save} next={markNext} />
    </Backdrop>
  );
};

const enhance = connect(
  null,
  { save, markNext }
);

export default enhance(StepOne);
