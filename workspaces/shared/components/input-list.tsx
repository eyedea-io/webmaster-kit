import {UI} from '@shared/config'
import * as React from 'react'
import {List, Props as ListProps} from './list'
import {Message} from './message'

type ErrorsPosition = 'each' | 'start' | 'end'

export interface Props extends ListProps {
  children: React.ReactNode
  errors: object
  errorsPosition?: ErrorsPosition
}

export const InputList = ({children, errors, errorsPosition = 'each', ...props}: Props) => {
  const matchedErrors = getMatchedErrors(children, errors)
  const unmatchedErrors = getUnmatchedErrors(matchedErrors, errors)

  return (
    <List spacing="sm" {...props}>
      {errorsPosition === 'start' && (
        <React.Fragment>
          <MatchedErrors errors={matchedErrors} />
          <UnmatchedErrors errors={unmatchedErrors} />
        </React.Fragment>
      )}

      {React.Children.map(children, (input: any) => (
        <React.Fragment key={input.props.name}>
          {input}

          {errorsPosition === 'each' && errors[input.props.name] && (
            <div className="InputList__error u-mt---">{errors[input.props.name]}</div>
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

      <style jsx>{`
        .InputList__error {
          text-align: left;
          font-size: 14px;
          color: ${UI.colors.negative};
        }
      `}</style>
    </List>
  )
}

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
    .map(children, (input: any) => input.props.name)
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
    <Message negative>
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
    return <Message negative>{errors}</Message>
  }

  return (
    <div>
      {Object.keys(errors).map(key => (
        <Message negative key={key}>{errors[key] || key}</Message>
      ))}
    </div>
  )
}
