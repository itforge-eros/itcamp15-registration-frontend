import React from 'react'
import {css} from '@emotion/core'
import Image from 'react-medium-image-zoom'

import {Programming} from '../core/questions'
import devAssignment from '../assets/programming_question.jpg'

const image = {
  src: devAssignment,
  alt: 'รูปเว็บไซต์',
  className: 'question-3-image'
}

const Q3Dev = (
  <div>
    <span>{Programming.Q3}</span>

    <Image image={image} imageZoom={image} />
  </div>
)

export default Q3Dev
