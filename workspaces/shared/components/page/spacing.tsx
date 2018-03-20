import {UI} from '@shared/config'
import * as React from 'react'

export const Spacing = () => (
  <div>
    <style jsx global>{`
      /* Top margin */
      .u-mt\\+\\+\\+ { margin-top: ${UI.spacing.xxl} !important; }
      .u-mt\\+\\+    { margin-top: ${UI.spacing.xl} !important; }
      .u-mt\\+       { margin-top: ${UI.spacing.lg} !important; }
      .u-mt          { margin-top: ${UI.spacing} !important; }
      .u-mt-         { margin-top: ${UI.spacing.sm} !important; }
      .u-mt--        { margin-top: ${UI.spacing.xs} !important; }
      .u-mt---       { margin-top: ${UI.spacing.xxs} !important; }

      /* Bottom margin */
      .u-mb\\+\\+\\+ { margin-bottom: ${UI.spacing.xxl} !important; }
      .u-mb\\+\\+    { margin-bottom: ${UI.spacing.xl} !important; }
      .u-mb\\+       { margin-bottom: ${UI.spacing.lg} !important; }
      .u-mb          { margin-bottom: ${UI.spacing} !important; }
      .u-mb-         { margin-bottom: ${UI.spacing.sm} !important; }
      .u-mb--        { margin-bottom: ${UI.spacing.xs} !important; }
      .u-mb---       { margin-bottom: ${UI.spacing.xxs} !important; }

      /* Left margin */
      .u-ml\\+\\+\\+ { margin-left: ${UI.spacing.xxl} !important; }
      .u-ml\\+\\+    { margin-left: ${UI.spacing.xl} !important; }
      .u-ml\\+       { margin-left: ${UI.spacing.lg} !important; }
      .u-ml          { margin-left: ${UI.spacing} !important; }
      .u-ml-         { margin-left: ${UI.spacing.sm} !important; }
      .u-ml--        { margin-left: ${UI.spacing.xs} !important; }
      .u-ml---       { margin-left: ${UI.spacing.xxs} !important; }

      /* Right margin */
      .u-mr\\+\\+\\+ { margin-right: ${UI.spacing.xxl} !important; }
      .u-mr\\+\\+    { margin-right: ${UI.spacing.xl} !important; }
      .u-mr\\+       { margin-right: ${UI.spacing.lg} !important; }
      .u-mr          { margin-right: ${UI.spacing} !important; }
      .u-mr-         { margin-right: ${UI.spacing.sm} !important; }
      .u-mr--        { margin-right: ${UI.spacing.xs} !important; }
      .u-mr---       { margin-right: ${UI.spacing.xxs} !important; }

      /* Horizontal margin */
      .u-mh\\+\\+\\+ { margin-right: ${UI.spacing.xxl} !important; margin-left: ${UI.spacing.xxl} !important; }
      .u-mh\\+\\+    { margin-right: ${UI.spacing.xl} !important; margin-left: ${UI.spacing.xl} !important; }
      .u-mh\\+       { margin-right: ${UI.spacing.lg} !important; margin-left: ${UI.spacing.lg} !important; }
      .u-mh          { margin-right: ${UI.spacing} !important; margin-left: ${UI.spacing} !important; }
      .u-mh-         { margin-right: ${UI.spacing.sm} !important; margin-left: ${UI.spacing.sm} !important; }
      .u-mh--        { margin-right: ${UI.spacing.xs} !important; margin-left: ${UI.spacing.xs} !important; }
      .u-mh---       { margin-right: ${UI.spacing.xxs} !important;  margin-left: ${UI.spacing.xxs} !important; }

      /* Vertical margin */
      .u-mv\\+\\+\\+ { margin-top: ${UI.spacing.xxl} !important; margin-bottom: ${UI.spacing.xxl} !important; }
      .u-mv\\+\\+    { margin-top: ${UI.spacing.xl} !important; margin-bottom: ${UI.spacing.xl} !important; }
      .u-mv\\+       { margin-top: ${UI.spacing.lg} !important; margin-bottom: ${UI.spacing.lg} !important; }
      .u-mv          { margin-top: ${UI.spacing} !important; margin-bottom: ${UI.spacing} !important; }
      .u-mv-         { margin-top: ${UI.spacing.sm} !important; margin-bottom: ${UI.spacing.sm} !important; }
      .u-mv--        { margin-top: ${UI.spacing.xs} !important; margin-bottom: ${UI.spacing.xs} !important; }
      .u-mv---       { margin-top: ${UI.spacing.xxs} !important;  margin-bottom: ${UI.spacing.xxs} !important; }

      /**
       * PADDINGS
       */

      /* Top padding */
      .u-pt\\+\\+\\+ { padding-top: ${UI.spacing.xxl} !important; }
      .u-pt\\+\\+    { padding-top: ${UI.spacing.xl} !important; }
      .u-pt\\+       { padding-top: ${UI.spacing.lg} !important; }
      .u-pt          { padding-top: ${UI.spacing} !important; }
      .u-pt-         { padding-top: ${UI.spacing.sm} !important; }
      .u-pt--        { padding-top: ${UI.spacing.xs} !important; }
      .u-pt---       { padding-top: ${UI.spacing.xxs} !important; }

      /* Bottom padding */
      .u-pb\\+\\+\\+ { padding-bottom: ${UI.spacing.xxl} !important; }
      .u-pb\\+\\+    { padding-bottom: ${UI.spacing.xl} !important; }
      .u-pb\\+       { padding-bottom: ${UI.spacing.lg} !important; }
      .u-pb          { padding-bottom: ${UI.spacing} !important; }
      .u-pb-         { padding-bottom: ${UI.spacing.sm} !important; }
      .u-pb--        { padding-bottom: ${UI.spacing.xs} !important; }
      .u-pb---       { padding-bottom: ${UI.spacing.xxs} !important; }

      /* Left padding */
      .u-pl\\+\\+\\+ { padding-left: ${UI.spacing.xxl} !important; }
      .u-pl\\+\\+    { padding-left: ${UI.spacing.xl} !important; }
      .u-pl\\+       { padding-left: ${UI.spacing.lg} !important; }
      .u-pl          { padding-left: ${UI.spacing} !important; }
      .u-pl-         { padding-left: ${UI.spacing.sm} !important; }
      .u-pl--        { padding-left: ${UI.spacing.xs} !important; }
      .u-pl---       { padding-left: ${UI.spacing.xxs} !important; }

      /* Right padding */
      .u-pr\\+\\+\\+ { padding-right: ${UI.spacing.xxl} !important; }
      .u-pr\\+\\+    { padding-right: ${UI.spacing.xl} !important; }
      .u-pr\\+       { padding-right: ${UI.spacing.lg} !important; }
      .u-pr          { padding-right: ${UI.spacing} !important; }
      .u-pr-         { padding-right: ${UI.spacing.sm} !important; }
      .u-pr--        { padding-right: ${UI.spacing.xs} !important; }
      .u-pr---       { padding-right: ${UI.spacing.xxs} !important; }

      /* Horizontal padding */
      .u-ph\\+\\+\\+ { padding-right: ${UI.spacing.xxl} !important; padding-left: ${UI.spacing.xxl} !important; }
      .u-ph\\+\\+    { padding-right: ${UI.spacing.xl} !important; padding-left: ${UI.spacing.xl} !important; }
      .u-ph\\+       { padding-right: ${UI.spacing.lg} !important; padding-left: ${UI.spacing.lg} !important; }
      .u-ph          { padding-right: ${UI.spacing} !important; padding-left: ${UI.spacing} !important; }
      .u-ph-         { padding-right: ${UI.spacing.sm} !important; padding-left: ${UI.spacing.sm} !important; }
      .u-ph--        { padding-right: ${UI.spacing.xs} !important; padding-left: ${UI.spacing.xs} !important; }
      .u-ph---       { padding-right: ${UI.spacing.xxs} !important;  padding-left: ${UI.spacing.xxs} !important; }

      /* Vertical padding */
      .u-pv\\+\\+\\+ { padding-top: ${UI.spacing.xxl} !important; padding-bottom: ${UI.spacing.xxl} !important; }
      .u-pv\\+\\+    { padding-top: ${UI.spacing.xl} !important; padding-bottom: ${UI.spacing.xl} !important; }
      .u-pv\\+       { padding-top: ${UI.spacing.lg} !important; padding-bottom: ${UI.spacing.lg} !important; }
      .u-pv          { padding-top: ${UI.spacing} !important; padding-bottom: ${UI.spacing} !important; }
      .u-pv-         { padding-top: ${UI.spacing.sm} !important; padding-bottom: ${UI.spacing.sm} !important; }
      .u-pv--        { padding-top: ${UI.spacing.xs} !important; padding-bottom: ${UI.spacing.xs} !important; }
      .u-pv---       { padding-top: ${UI.spacing.xxs} !important;  padding-bottom: ${UI.spacing.xxs} !important; }
    `}</style>
  </div>
)
