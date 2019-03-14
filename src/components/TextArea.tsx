import React from 'react'

import {TextInput} from './Input'
import withField from './withField'

const TextArea = TextInput.withComponent('textarea')

const TextAreaInput = props => <TextArea rows={9} {...props} />

export default withField(TextAreaInput)
