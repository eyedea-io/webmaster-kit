import {Props as BlockProps} from '@shared/components/block'
import {List, Props as ListProps} from '@shared/components/list'
import {Message} from '@shared/components/message'
import styled from '@shared/utils/styled'
import {isObservableMap} from 'mobx'
import * as React from 'react'
import {hot} from 'react-hot-loader'

type ErrorsPosition = 'each' | 'start' | 'end'

export interface Props extends ListProps, BlockProps {
  children: React.ReactNode
  errors: object
  errorsPosition?: ErrorsPosition
}

const InputError = styled.div`
  text-align: left;
  font-size: 14px;
  color: ${props => props.theme.colors.negative.hex};
`

const InputListComponent: React.SFC<Props> = ({
  children, errors = {}, errorsPosition = 'each', ...props
}: Props) => {
  const err = isObservableMap(errors) ? errors.toJSON() : errors
  const matchedErrors = getMatchedErrors(children, err)
  const unmatchedErrors = getUnmatchedErrors(matchedErrors, err)

  return (
    <List spacing="xxs" {...props}>
      {errorsPosition === 'start' && (
        <React.Fragment>
          <MatchedErrors errors={matchedErrors} />
          <UnmatchedErrors errors={unmatchedErrors} />
        </React.Fragment>
      )}

      {React.Children.map(children, (input: any) => (
        <React.Fragment key={input.props.name}>
          {input}

          {errorsPosition === 'each' && err[input.props.name] && (
            <InputError>{err[input.props.name]}</InputError>
          )}
        </React.Fragment>
      ))}

      {errorsPosition === 'each' && (
        <UnmatchedErrors errors={unmatchedErrors} />
      )}

      {errorsPosition === 'end' && (
        <React.Fragment>
          <MatchedErrors errors={matchedErrors} />
          <UnmatchedErrors errors={unmatchedErrors} />
        </React.Fragment>
      )}
    </List>
  )
}

export const InputList = hot(module)(
  styled(InputListComponent)``
)

InputList.displayName = 'InputList'

function getUnmatchedErrors(matchedErrors: any, errors: object) {
  return Object.keys(errors)
    .filter(err => Object.keys(matchedErrors).indexOf(err) < 0)
    .reduce((all, key) => {
      all[key] = errors[key]

      return all
    }, [])
}

function getMatchedErrors(children: React.ReactNode, errors: object) {
  const errorKeys = Object.keys(errors)

  return React.Children
    .map(children || [], (input: any) => input.props.name)
    .filter(item => errorKeys.indexOf(item) >= 0)
    .reduce((all, key) => {
      all[key] = errors[key]

      return all
    }, [])
}

function MatchedErrors({errors}: any) {
  if (Object.keys(errors).length === 0) {
    return null
  }

  return (
    <Message variant="negative">
      <List spacing="xs">
        {Object.keys(errors).map(key => (
          <div key={key}><b>{key}:</b> {errors[key]}</div>
        ))}
      </List>
    </Message>
  )
}

function UnmatchedErrors({errors}: any) {
  if (typeof errors === 'string') {
    return <Message variant="negative">{errors}</Message>
  }

  if (Object.keys(errors).length === 0) {
    return null
  }

  return (
    <div>
      {Object.keys(errors).map(key => (
        <Message variant="negative" key={key}>{errors[key] || key}</Message>
      ))}
    </div>
  )
}
