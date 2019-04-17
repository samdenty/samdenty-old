import styled from '@emotion/styled'

export const ImageGrid = styled.figure`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${({ columns }) => Math.floor(100 / columns) - 2}%, 1fr)
  );

  p {
    display: contents;
    > * {
      width: 100%;
    }
  }
`
