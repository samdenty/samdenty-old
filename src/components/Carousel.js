import * as React from 'react'
import ReactCarousel from 'react-images'
import styled from '@emotion/styled'

const Container = styled.div`
  .react-images__track {
    transform: none !important;
  }
`

export const Carousel = ({ children }) => {
  const imageElements = React.Children.toArray(children.props.children).filter(
    element => typeof element === 'object'
  )

  return (
    <Container>
      <ReactCarousel
        className="asd"
        views={imageElements}
        components={{
          View({ data, ...props }) {
            return data
          },
        }}
      />
    </Container>
  )
}
