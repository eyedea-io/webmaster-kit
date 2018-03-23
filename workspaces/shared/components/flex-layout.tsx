import {UI} from '@shared/config'
import * as React from 'react'

type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface Props {
  children: React.ReactChild | Array<React.ReactChild>
  middle?: boolean
  split?: boolean
  full?: boolean
  wrap?: boolean
  spacing?: Spacing
}

export const FlexLayout = ({children, middle, split, wrap, full, spacing = 'md'}: Props) => (
  <div
    className={`
      FlexLayout
      ${split ? 'FlexLayout--split' : ''}
      ${middle ? 'FlexLayout--middle' : ''}
      ${wrap ? 'FlexLayout--wrap' : ''}
      ${full ? 'FlexLayout--full' : ''}
      ${spacing ? `FlexLayout--${spacing}` : ''}
    `}
  >
    {children}

    <style jsx>{`
      .FlexLayout { display: flex; }

      .FlexLayout--split { justify-content: space-between; }
      .FlexLayout--middle { align-items: center;  }
      .FlexLayout--wrap { flex-wrap: wrap;  }
      .FlexLayout--full { width: 100%; }

      .FlexLayout--xs { margin-left: -${UI.spacing.xs}; }
      .FlexLayout--xs > :global(*) { margin-left: ${UI.spacing.xs}; }

      .FlexLayout--sm { margin-left: -${UI.spacing.sm}; }
      .FlexLayout--sm > :global(*) { margin-left: ${UI.spacing.sm}; }

      .FlexLayout--md { margin-left: -${UI.spacing}; }
      .FlexLayout--md > :global(*) { margin-left: ${UI.spacing}; }

      .FlexLayout--lg { margin-left: -${UI.spacing.lg}; }
      .FlexLayout--lg > :global(*) { margin-left: ${UI.spacing.lg}; }

      .FlexLayout--xl { margin-left: -${UI.spacing.xl}; }
      .FlexLayout--xl > :global(*) { margin-left: ${UI.spacing.xl}; }

      .FlexLayout--split,
      .FlexLayout--split > :global(*) { margin-left: 0; }
    `}</style>
  </div>
)
