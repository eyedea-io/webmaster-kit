import * as React from 'react'
import {CSS} from '../constants'

type Style = 'positive' | 'negative'

export interface Props {
  positive?: boolean
  negative?: boolean
  content?: string
  children?: React.ReactChild
}

export const Message = ({
  content, positive, negative, children, ...props
}: Props) => children || content ? (
  <div className={`
    Message
    ${positive ? 'Message--positive' : ''}
    ${negative ? 'Message--negative' : ''}
  `}>
    <div className="Message_inner">
      {children || content}
    </div>

    <style jsx>{`
      .Message {
        position: relative;
        min-height: 1em;
        line-height: 1em;
        padding: ${CSS.spacing.sm};
        border-radius: ${CSS.radius};
        font-size: 14px;
      }

      .Message--negative {
        color: ${CSS.colors.negative};
        background: rgba(${CSS.colors.negative.rgb}, .3);
        box-shadow: 0 0 0 1px ${CSS.colors.negative} inset, 0 0 0 0 transparent;
      }

      .Message--positive {
        color: ${CSS.colors.positive};
        background: rgba(${CSS.colors.positive.rgb}, .3);
        box-shadow: 0 0 0 1px ${CSS.colors.positive} inset, 0 0 0 0 transparent;
      }
    `}</style>
  </div>
) : null
