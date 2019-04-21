import * as React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const baseHeading = css`
  display: flex;

  .anchor {
    transition: all 0.2s ease;
    opacity: 0;

    width: 1em;
    margin-right: 5px;
    padding: 0 0.2em;
    border-radius: 50%;
    margin-left: calc(-1em - 5px);

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    svg {
      height: 100%;
      width: 100%;
    }
  }

  &:hover .anchor {
    opacity: 1;
  }
`

export const h1 = styled.h1`
  ${baseHeading};

  font-size: 2.8rem;
  margin-bottom: 8px;
`

export const h2 = styled.h2`
  ${baseHeading};

  font-size: 2.2rem;
  font-weight: 700;
  line-height: 34.5px;
  letter-spacing: -0.45px;
`

export const h3 = styled.h3`
  ${baseHeading};
`

export const h4 = styled.h4`
  ${baseHeading};
`

export const h5 = styled.h5`
  ${baseHeading};
`

export const h6 = styled.h6`
  ${baseHeading};
`
