import React from 'react'
import {connect} from 'react-redux'
import styled from '@emotion/styled'
import {withRouteData} from 'react-static'

import {Backdrop} from '../components/Layout'
import MajorForm from '../components/MajorForm'

import {save, markNext} from '../ducks/submission'
import Title from '../components/Title'
import Stepper from '../components/Stepper'
import NavBar from '../components/NavBar'

const StepOne = ({questions, save, markNext}) => (
  <Backdrop>
    <NavBar />
    <Title>คำถามค่าย</Title>
    <Stepper
      currentStep={'คำถามค่าย'}
      steps={['ข้อมูลส่วนตัว', 'ข้อมูลเพิ่มเติม', 'คำถามกลาง', 'คำถามค่าย']}
    />
    <MajorForm onSubmit={save} next={markNext} questions={questions} />
  </Backdrop>
)

const enhance = connect(
  null,
  {save, markNext}
)

export default enhance(StepOne)
