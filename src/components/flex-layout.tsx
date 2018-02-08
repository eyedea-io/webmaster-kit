import * as React from 'react'
import {CSS} from '../constants'

type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  children: React.ReactChild | Array<React.ReactChild>
  middle?: boolean
  split?: boolean
  wrap?: boolean
  spacing?: Spacing
}

export const FlexLayout = ({children, middle, split, wrap, spacing = 'md'}: Props) => (
  <div
    className={`
      FlexLayout
      ${split ? 'FlexLayout--split' : ''}
      ${middle ? 'FlexLayout--middle' : ''}
      ${wrap ? 'FlexLayout--wrap' : ''}
      ${spacing ? `FlexLayout--${spacing}` : ''}
    `}
  >
    {children}

    <style jsx>{`
      .FlexLayout { display: flex; }

      .FlexLayout--split { justify-content: space-between; }
      .FlexLayout--middle { align-items: center;  }
      .FlexLayout--wrap { flex-wrap: wrap;  }

      .FlexLayout--xs { margin-left: -${CSS.spacing.xs}; }
      .FlexLayout--xs > :global(*) { margin-left: ${CSS.spacing.xs}; }

      .FlexLayout--sm { margin-left: -${CSS.spacing.sm}; }
      .FlexLayout--sm > :global(*) { margin-left: ${CSS.spacing.sm}; }

      .FlexLayout--md { margin-left: -${CSS.spacing}; }
      .FlexLayout--md > :global(*) { margin-left: ${CSS.spacing}; }

      .FlexLayout--lg { margin-left: -${CSS.spacing.lg}; }
      .FlexLayout--lg > :global(*) { margin-left: ${CSS.spacing.lg}; }

      .FlexLayout--xl { margin-left: -${CSS.spacing.xl}; }
      .FlexLayout--xl > :global(*) { margin-left: ${CSS.spacing.xl}; }
    `}</style>
  </div>
)
