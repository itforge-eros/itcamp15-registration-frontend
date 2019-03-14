import {navigate} from '@reach/router'

import logger from './log'
import {getStepFromPath} from './util'

export function prev() {
  const {major, step} = getStepFromPath()

  logger.log('Backtracked: ', major, step - 1)

  if (window.analytics) {
    window.analytics.track('Backtracked Step', {major, step: step - 1})
  }

  navigate(`/${major}/step${step - 1}`)
}

export function next() {
  const {major, step} = getStepFromPath()

  logger.log('Advanced:', major, step + 1)

  if (window.analytics) {
    window.analytics.track('Advanced Step', {major, step: step + 1})
  }

  // If user is at last step, continue to verification process
  if (step === 4) {
    navigate(`/${major}/verify`)
    return
  }

  navigate(`/${major}/step${step + 1}`)
}
