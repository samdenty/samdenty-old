import * as React from 'react'
import styled from '@emotion/styled'

const Img = styled.img`
  max-width: 100%;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
`

export const img = ({ ...props }) => {
  return <Img className="gatsby-resp-image-image" {...props} />
}
