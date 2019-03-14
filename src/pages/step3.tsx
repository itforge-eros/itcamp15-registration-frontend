import React from 'react'
import {connect} from 'react-redux'
import styled from '@emotion/styled'

import {Backdrop} from '../components/Layout'
import QuestionForm from '../components/QuestionForm'

import {save, markNext} from '../ducks/submission'
import Title from '../components/Title';
import Stepper from '../components/Stepper';
import NavBar from '../components/NavBar';

const StepOne = ({save, markNext}) => (
  <Backdrop>
    <NavBar />
    <Title>คำถามกลาง</Title>
    <Stepper
      currentStep={"คำถามกลาง"}
      steps={["ข้อมูลนักเวทย์", "ข้อมูลเพิ่มเติม", "คำถามกลาง", "คำถามสาขา"]}
    />
    <QuestionForm onSubmit={save} next={markNext} />
  </Backdrop>
)

const enhance = connect(
  null,
  {save, markNext}
)

export default enhance(StepOne)
