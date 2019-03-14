import React from "react";

import { FormContainer, Paper, Row } from "./Layout";
import Button from "./Button";
import TextArea from "./TextArea";

import { General } from "../core/questions";
import styled from "@emotion/styled";
import withWizard from "../core/form";
import { prev, next } from "../core/step";
import ChangeMajorButton from "./ChangeMajorButton";
import TransparentButton from "./TransparentButton";

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 650px) {
    font-size: 0.9em;
  }
  @media screen and (max-width: 400px) {
    font-size: 0.8em;
  }
`;

const QuestionForm = ({ next, save, handleSubmit }) => (
  <FormContainer onSubmit={handleSubmit}>
    <Paper>
      {Object.keys(General).map((key, index) => (
        <TextArea
          key={key}
          placeholder="ว่ามา ฉันอ่านทั้งหมด เริ่ม!"
          name={"generalAnswer" + (index + 1)}
          label={General[key]}
          wordy
        />
      ))}
      {/* <TextArea name="generalAnswer2" label={General.Q2} wordy />
      <TextArea name="generalAnswer3" label={General.Q3} wordy /> */}
    </Paper>

    <Row style={{ marginBottom: "2em" }}>
      <ButtonGroup>
        <TransparentButton
          arrow="left"
          onClick={prev}
          style={{ marginRight: "0.8em" }}
          type="button"
        >
          ก่อนหน้า
        </TransparentButton>

        <Button
          onClick={next}
          type="submit"
          arrow="right"
          style={{ marginLeft: "0.8em" }}
        >
          ถัดไป
        </Button>
      </ButtonGroup>
    </Row>
    <Row style={{ marginBottom: "2.8em" }}>
      <ChangeMajorButton />
    </Row>
  </FormContainer>
);

export default withWizard(QuestionForm);
