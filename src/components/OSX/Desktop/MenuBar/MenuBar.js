import * as React from 'react'
import { styled } from 'linaria/react'
import AppleIcon from '../../AppleIcon.svg'
import { useApps } from '../../App'
import { observer } from 'mobx-react-lite'
import { Menu } from './Menu'
import { MenuItem } from 'react-contextmenu'

const StyledMenuBar = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  background: rgba(22, 24, 27, 0.6);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23);

  height: 2em;
  max-height: 35px;
`

// Seperate element due to bug with hover not working on menus
const BackdropFilter = styled.div`
  height: 2em;
  max-height: 35px;
  backdrop-filter: blur(30px);
`

export const MenuBar = observer(() => {
  const { focusedApp } = useApps()

  return (
    <>
      <BackdropFilter />
      <StyledMenuBar>
        <Menu
          name={<AppleIcon style={{ width: '1.2em', marginTop: '-0.15em' }} />}
          style={{ marginLeft: '1em', marginRight: '0.5em' }}
        />

        {focusedApp && (
          <>
            <Menu name={focusedApp.name} style={{ fontWeight: '600' }}>
              {/*<MenuItem divider />*/}
              <MenuItem onClick={() => (focusedApp.open = false)}>
                Quit {focusedApp.name}
              </MenuItem>
            </Menu>
            {focusedApp.menu}
          </>
        )}
      </StyledMenuBar>
    </>
  )
})
