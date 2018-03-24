import {UI} from '@shared/config'
import * as React from 'react'

export interface Props {
  positive?: boolean
  negative?: boolean
  content?: string
  children?: React.ReactChild
}

export const Message = ({
  content, positive, negative, children,
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
        padding: ${UI.spacing.sm};
        border-radius: ${UI.radius};
        font-size: 14px;
      }

      .Message--negative {
        color: ${UI.colors.negative};
        background: rgba(${UI.colors.negative.rgb}, .3);
        box-shadow: 0 0 0 1px ${UI.colors.negative} inset, 0 0 0 0 transparent;
      }

      .Message--positive {
        color: ${UI.colors.positive};
        background: rgba(${UI.colors.positive.rgb}, .3);
        box-shadow: 0 0 0 1px ${UI.colors.positive} inset, 0 0 0 0 transparent;
      }
    `}</style>
  </div>
) : null
