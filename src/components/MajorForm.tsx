import React from 'react'

import {FormContainer, Paper, Row} from './Layout'
import Button from './Button'
import TextArea from './TextArea'
import DesignUpload from './DesignUpload'
import Questions from '../core/questions'
import withWizard from '../core/form'
import {getMajorFromPath} from '../core/util'
import {prev, next} from '../core/step'
import ChangeMajorButton from './ChangeMajorButton'
import TransparentButton from './TransparentButton'
import styled from '@emotion/styled'
// import Q3Dev from "./Q3Dev";
interface Question {
  Q1?: string
  Q2?: string
}

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 650px) {
    font-size: 0.9em;
  }
  @media screen and (max-width: 400px) {
    font-size: 0.8em;
  }
`

const MajorQuestionForm = ({handleSubmit, next, save}) => {
  const major = getMajorFromPath()
  let questions = {}
  if (typeof Questions !== 'undefined') {
    if (typeof Questions[major] !== 'undefined') {
      questions = Questions[major]
    }
  }
  // const Q4 = major === "design" ? DesignUpload : TextArea;
  // let Q3 = "";
  // if (typeof questions !== "undefined") {
  //   Q3 = major === "programming" ? Q3Dev : questions.Q3;
  // }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Paper>
        {Object.keys(questions).map((key, index) => (
          <TextArea
            key={key}
            placeholder="ว่ามา ฉันอ่านทั้งหมด เริ่ม!"
            name={'majorAnswer' + (index + 1)}
            label={questions[key]}
            wordy
          />
        ))}
      </Paper>

      <Row style={{marginBottom: '2em'}}>
        <ButtonGroup>
          <TransparentButton
            arrow="left"
            onClick={prev}
            style={{marginRight: '0.8em'}}
            type="button"
          >
            ก่อนหน้า
          </TransparentButton>

          <Button
            onClick={next}
            type="submit"
            arrow="right"
            style={{marginLeft: '0.8em'}}
          >
            ถัดไป
          </Button>
        </ButtonGroup>
      </Row>
      <Row style={{marginBottom: '2.8em'}}>
        <ChangeMajorButton />
      </Row>
    </FormContainer>
  )
}

export default withWizard(MajorQuestionForm)
