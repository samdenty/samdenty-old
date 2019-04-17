import Moment from 'react-moment'

export const Period = ({ from, to, ...rest }) => (
  <>
    {from && <Moment {...rest}>{from}</Moment>}
    {from && to && ` - `}
    {to && <Moment {...rest}>{to}</Moment>}
  </>
)
