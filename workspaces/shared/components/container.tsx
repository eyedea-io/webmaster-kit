import styled from '@shared/utils/styled'

export interface Props {
  maxWidth?: 480 | 768 | 960
}

export const Container = styled.div.attrs({})<Props>`
  max-width: ${({maxWidth = 960}) => maxWidth}px;
  margin-left: auto;
  margin-right: auto;
`
