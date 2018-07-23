import styled from '@shared/utils/styled'

export const Heading = styled.h1`
  margin-bottom: ${props => props.theme.spacing.md}
`

export const AuthForm = styled.form`
  margin-left: auto;
  margin-right: auto;
  max-width: 480px;
  padding: ${props => props.theme.spacing.md} 0;
`
