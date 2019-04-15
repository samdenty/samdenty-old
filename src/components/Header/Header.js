import * as React from "react"
import styled from "@emotion/styled"
import { SmallButton } from "../Button"
import { Logo } from "./Logo"

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`

export const Spacer = styled.div`
  width: 30%;
`

export const Header = () => (
  <StyledHeader>
    <Logo />
    <Spacer />
    <SmallButton>Login</SmallButton>
  </StyledHeader>
)
