import {UI} from '@shared/config'
import * as React from 'react'

export const Typography = () => (
  <div>
    <style jsx global>{`
      a {
        color: ${UI.colors.primary};
        cursor: pointer;
        text-decoration: none;
      }


      h1 {
        color: #333;
        font-weight: 300;
      }

      .u-uppercase { text-transform: uppercase; }

      /* Text align */
      .u-ta-l { text-align: left !important; }
      .u-ta-c { text-align: center !important; }
      .u-ta-r { text-align: right !important; }

      /* Font weight */
      .u-light     { font-weight: 300; }
      .u-regular   { font-weight: 400; }
      .u-medium    { font-weight: 500; }
      .u-semi-bold { font-weight: 600; }
      .u-bold      { font-weight: 700; }

      /* Font sizing */
      .u-alpha   { font-size: 32px !important; line-height: 42px !important; }
      .u-beta    { font-size: 28px !important; line-height: 36px !important; }
      .u-gamma   { font-size: 24px !important; line-height: 32px !important; }
      .u-delta   { font-size: 20px !important; line-height: 28px !important; }
      .u-epsilon { font-size: 18px !important; line-height: 26px !important; }
      .u-zeta    { font-size: 16px !important; line-height: 24px !important; }
      .u-milli   { font-size: 14px !important; line-height: 20px !important; }
      .u-micro   { font-size: 13px !important; line-height: 18px !important; }
      .u-nano    { font-size: 12px !important; line-height: 16px !important; }
    `}</style>
  </div>
)
