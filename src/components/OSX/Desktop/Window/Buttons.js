import * as React from 'react'
import { styled } from 'linaria/react'
import { useApp } from '../../App'
import { observer } from 'mobx-react-lite'

const StyledButtons = styled.div`
  display: flex;
  margin: 0.313em;
`

const Button = styled.div`
  height: 1.125em;
  width: 1.125em;
  margin: 0 0.313em;
  border-radius: 100%;
  cursor: default;
  background-color: ${({ colored, color }) =>
    colored ? color : 'rgba(255, 255, 255, 0.2)'};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ color }) => color};
  }
`

export const Buttons = observer(() => {
  const app = useApp()

  return (
    <StyledButtons data-nodrag>
      <Button
        onClick={() => (app.open = false)}
        color="#fe4a50"
        colored={app.focused}
      />
      <Button
        onClick={() => (app.visible = false)}
        color="#f9c32f"
        colored={app.focused}
      />
      <Button
        onClick={() => (app.zoomed = !app.zoomed)}
        color="#00ca56"
        colored={app.focused}
      />
    </StyledButtons>
  )
})
