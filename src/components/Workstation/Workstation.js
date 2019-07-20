import * as React from 'react'
import { OSX, App } from '../OSX'
import { Steam } from './Steam'
import { Chrome } from './Chrome'
import { VSCode } from './VSCode'

export const Workstation = props => {
  return (
    <OSX {...props}>
      <Chrome />
      <VSCode />
      <Steam />
    </OSX>
  )
}
