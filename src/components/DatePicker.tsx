import React from 'react'
import {DatePicker} from 'antd'
import moment from 'moment'
import c from 'classnames'


import 'moment/locale/th'

import 'antd/lib/date-picker/style/css'

import withField from './withField'


const CustomDatePicker = (props: any) => {

  return (
    <DatePicker
      placeholder="กรุณาเลือกวัน..."
      className={c(
        'custom-date-picker',
        props.meta &&
          props.meta.touched &&
          props.meta.error &&
          'custom-date-picker-error'
      )}
      disabled={props.isDisabled}
      onChange={m =>
        props.onChange(m ? m.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'))
      }
      value={props.value ? moment(props.value) : undefined}
      format="LL"
      locale="th"
    />
  )
}


export default withField(CustomDatePicker)
