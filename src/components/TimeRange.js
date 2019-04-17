import * as React from 'react'
import Moment from 'react-moment'
import moment from 'moment'

export const TimeRange = ({ from, to, ...props }) => {
  const fromString = from && moment(from).format(props.format)
  const toString = to && moment(to).format(props.format)

  if (fromString === toString) {
    return <Moment {...props}>{from}</Moment>
  }

  return (
    <>
      {from && <Moment {...props}>{from}</Moment>}
      {from && to && ` - `}
      {to && <Moment {...props}>{to}</Moment>}
    </>
  )
}
