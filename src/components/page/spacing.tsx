import * as React from 'react'
import {CSS} from '../../constants'

export const Spacing = () => (
  <style jsx global>{`
    /* Top margin */
    .u-mt\\+\\+\\+ { margin-top: ${CSS.spacing.xxl} !important; }
    .u-mt\\+\\+    { margin-top: ${CSS.spacing.xl} !important; }
    .u-mt\\+       { margin-top: ${CSS.spacing.lg} !important; }
    .u-mt          { margin-top: ${CSS.spacing} !important; }
    .u-mt-         { margin-top: ${CSS.spacing.sm} !important; }
    .u-mt--        { margin-top: ${CSS.spacing.xs} !important; }
    .u-mt---       { margin-top: ${CSS.spacing.xxs} !important; }

    /* Bottom margin */
    .u-mb\\+\\+\\+ { margin-bottom: ${CSS.spacing.xxl} !important; }
    .u-mb\\+\\+    { margin-bottom: ${CSS.spacing.xl} !important; }
    .u-mb\\+       { margin-bottom: ${CSS.spacing.lg} !important; }
    .u-mb          { margin-bottom: ${CSS.spacing} !important; }
    .u-mb-         { margin-bottom: ${CSS.spacing.sm} !important; }
    .u-mb--        { margin-bottom: ${CSS.spacing.xs} !important; }
    .u-mb---       { margin-bottom: ${CSS.spacing.xxs} !important; }

    /* Left margin */
    .u-ml\\+\\+\\+ { margin-left: ${CSS.spacing.xxl} !important; }
    .u-ml\\+\\+    { margin-left: ${CSS.spacing.xl} !important; }
    .u-ml\\+       { margin-left: ${CSS.spacing.lg} !important; }
    .u-ml          { margin-left: ${CSS.spacing} !important; }
    .u-ml-         { margin-left: ${CSS.spacing.sm} !important; }
    .u-ml--        { margin-left: ${CSS.spacing.xs} !important; }
    .u-ml---       { margin-left: ${CSS.spacing.xxs} !important; }

    /* Right margin */
    .u-mr\\+\\+\\+ { margin-right: ${CSS.spacing.xxl} !important; }
    .u-mr\\+\\+    { margin-right: ${CSS.spacing.xl} !important; }
    .u-mr\\+       { margin-right: ${CSS.spacing.lg} !important; }
    .u-mr          { margin-right: ${CSS.spacing} !important; }
    .u-mr-         { margin-right: ${CSS.spacing.sm} !important; }
    .u-mr--        { margin-right: ${CSS.spacing.xs} !important; }
    .u-mr---       { margin-right: ${CSS.spacing.xxs} !important; }

    /* Horizontal margin */
    .u-mh\\+\\+\\+ { margin-right: ${CSS.spacing.xxl} !important; margin-left: ${CSS.spacing.xxl} !important; }
    .u-mh\\+\\+    { margin-right: ${CSS.spacing.xl} !important; margin-left: ${CSS.spacing.xl} !important; }
    .u-mh\\+       { margin-right: ${CSS.spacing.lg} !important; margin-left: ${CSS.spacing.lg} !important; }
    .u-mh          { margin-right: ${CSS.spacing} !important; margin-left: ${CSS.spacing} !important; }
    .u-mh-         { margin-right: ${CSS.spacing.sm} !important; margin-left: ${CSS.spacing.sm} !important; }
    .u-mh--        { margin-right: ${CSS.spacing.xs} !important; margin-left: ${CSS.spacing.xs} !important; }
    .u-mh---       { margin-right: ${CSS.spacing.xxs} !important;  margin-left: ${CSS.spacing.xxs} !important; }

    /* Vertical margin */
    .u-mv\\+\\+\\+ { margin-top: ${CSS.spacing.xxl} !important; margin-bottom: ${CSS.spacing.xxl} !important; }
    .u-mv\\+\\+    { margin-top: ${CSS.spacing.xl} !important; margin-bottom: ${CSS.spacing.xl} !important; }
    .u-mv\\+       { margin-top: ${CSS.spacing.lg} !important; margin-bottom: ${CSS.spacing.lg} !important; }
    .u-mv          { margin-top: ${CSS.spacing} !important; margin-bottom: ${CSS.spacing} !important; }
    .u-mv-         { margin-top: ${CSS.spacing.sm} !important; margin-bottom: ${CSS.spacing.sm} !important; }
    .u-mv--        { margin-top: ${CSS.spacing.xs} !important; margin-bottom: ${CSS.spacing.xs} !important; }
    .u-mv---       { margin-top: ${CSS.spacing.xxs} !important;  margin-bottom: ${CSS.spacing.xxs} !important; }

    /**
     * PADDINGS
     */

    /* Top padding */
    .u-pt\\+\\+\\+ { padding-top: ${CSS.spacing.xxl} !important; }
    .u-pt\\+\\+    { padding-top: ${CSS.spacing.xl} !important; }
    .u-pt\\+       { padding-top: ${CSS.spacing.lg} !important; }
    .u-pt          { padding-top: ${CSS.spacing} !important; }
    .u-pt-         { padding-top: ${CSS.spacing.sm} !important; }
    .u-pt--        { padding-top: ${CSS.spacing.xs} !important; }
    .u-pt---       { padding-top: ${CSS.spacing.xxs} !important; }

    /* Bottom padding */
    .u-pb\\+\\+\\+ { padding-bottom: ${CSS.spacing.xxl} !important; }
    .u-pb\\+\\+    { padding-bottom: ${CSS.spacing.xl} !important; }
    .u-pb\\+       { padding-bottom: ${CSS.spacing.lg} !important; }
    .u-pb          { padding-bottom: ${CSS.spacing} !important; }
    .u-pb-         { padding-bottom: ${CSS.spacing.sm} !important; }
    .u-pb--        { padding-bottom: ${CSS.spacing.xs} !important; }
    .u-pb---       { padding-bottom: ${CSS.spacing.xxs} !important; }

    /* Left padding */
    .u-pl\\+\\+\\+ { padding-left: ${CSS.spacing.xxl} !important; }
    .u-pl\\+\\+    { padding-left: ${CSS.spacing.xl} !important; }
    .u-pl\\+       { padding-left: ${CSS.spacing.lg} !important; }
    .u-pl          { padding-left: ${CSS.spacing} !important; }
    .u-pl-         { padding-left: ${CSS.spacing.sm} !important; }
    .u-pl--        { padding-left: ${CSS.spacing.xs} !important; }
    .u-pl---       { padding-left: ${CSS.spacing.xxs} !important; }

    /* Right padding */
    .u-pr\\+\\+\\+ { padding-right: ${CSS.spacing.xxl} !important; }
    .u-pr\\+\\+    { padding-right: ${CSS.spacing.xl} !important; }
    .u-pr\\+       { padding-right: ${CSS.spacing.lg} !important; }
    .u-pr          { padding-right: ${CSS.spacing} !important; }
    .u-pr-         { padding-right: ${CSS.spacing.sm} !important; }
    .u-pr--        { padding-right: ${CSS.spacing.xs} !important; }
    .u-pr---       { padding-right: ${CSS.spacing.xxs} !important; }

    /* Horizontal padding */
    .u-ph\\+\\+\\+ { padding-right: ${CSS.spacing.xxl} !important; padding-left: ${CSS.spacing.xxl} !important; }
    .u-ph\\+\\+    { padding-right: ${CSS.spacing.xl} !important; padding-left: ${CSS.spacing.xl} !important; }
    .u-ph\\+       { padding-right: ${CSS.spacing.lg} !important; padding-left: ${CSS.spacing.lg} !important; }
    .u-ph          { padding-right: ${CSS.spacing} !important; padding-left: ${CSS.spacing} !important; }
    .u-ph-         { padding-right: ${CSS.spacing.sm} !important; padding-left: ${CSS.spacing.sm} !important; }
    .u-ph--        { padding-right: ${CSS.spacing.xs} !important; padding-left: ${CSS.spacing.xs} !important; }
    .u-ph---       { padding-right: ${CSS.spacing.xxs} !important;  padding-left: ${CSS.spacing.xxs} !important; }

    /* Vertical padding */
    .u-pv\\+\\+\\+ { padding-top: ${CSS.spacing.xxl} !important; padding-bottom: ${CSS.spacing.xxl} !important; }
    .u-pv\\+\\+    { padding-top: ${CSS.spacing.xl} !important; padding-bottom: ${CSS.spacing.xl} !important; }
    .u-pv\\+       { padding-top: ${CSS.spacing.lg} !important; padding-bottom: ${CSS.spacing.lg} !important; }
    .u-pv          { padding-top: ${CSS.spacing} !important; padding-bottom: ${CSS.spacing} !important; }
    .u-pv-         { padding-top: ${CSS.spacing.sm} !important; padding-bottom: ${CSS.spacing.sm} !important; }
    .u-pv--        { padding-top: ${CSS.spacing.xs} !important; padding-bottom: ${CSS.spacing.xs} !important; }
    .u-pv---       { padding-top: ${CSS.spacing.xxs} !important;  padding-bottom: ${CSS.spacing.xxs} !important; }
  `}</style>
)
