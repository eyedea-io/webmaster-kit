import {UI} from '@shared/config'
import * as React from 'react'

type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface Props {
  children: React.ReactNode,
  horizontal?: boolean,
  separated?: boolean,
  spacing?: Spacing
}

export const List = ({children, separated, horizontal, spacing = 'md'}: Props) => (
  <div className={`
    List
    ${horizontal ? 'List--horizontal' : ''}
    ${separated ? 'List--separated' : ''}
    ${spacing ? `List--${spacing}` : ''}
  `}>
    {children}

    <style jsx>{`
      .List {
        width: 100%;
        padding: 0;
        margin: 0;
        list-style-type: none;
      }

      .List--horizontal {
        display: flex;
        align-items: center;
      }


      .List--xs:not(.List--horizontal) > :global(*) + :global(*) { margin-top: ${UI.spacing.xs}; }
      .List--sm:not(.List--horizontal) > :global(*) + :global(*) { margin-top: ${UI.spacing.sm}; }
      .List--md:not(.List--horizontal) > :global(*) + :global(*) { margin-top: ${UI.spacing}; }
      .List--lg:not(.List--horizontal) > :global(*) + :global(*) { margin-top: ${UI.spacing.lg}; }
      .List--xl:not(.List--horizontal) > :global(*) + :global(*) { margin-top: ${UI.spacing.xl}; }

      .List--separated:not(.List--horizontal) > :global(* + *) { border-top: 1px solid ${UI.colors.ui} }
      .List--xs.List--separated > :global(*) + :global(*) { padding-top: ${UI.spacing.xs}; }
      .List--sm.List--separated > :global(*) + :global(*) { padding-top: ${UI.spacing.sm}; }
      .List--md.List--separated > :global(*) + :global(*) { padding-top: ${UI.spacing}; }
      .List--lg.List--separated > :global(*) + :global(*) { padding-top: ${UI.spacing.lg}; }
      .List--xl.List--separated > :global(*) + :global(*) { padding-top: ${UI.spacing.xl}; }

      .List--xs.List--horizontal > :global(* + *) { margin-left: ${UI.spacing.xs} }
      .List--sm.List--horizontal > :global(* + *) { margin-left: ${UI.spacing.sm} }
      .List--md.List--horizontal > :global(* + *) { margin-left: ${UI.spacing} }
      .List--lg.List--horizontal > :global(* + *) { margin-left: ${UI.spacing.lg} }
      .List--xl.List--horizontal > :global(* + *) { margin-left: ${UI.spacing.xl} }
    `}</style>
  </div>
)
