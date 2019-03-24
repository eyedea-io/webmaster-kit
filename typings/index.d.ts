/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare interface Window {
  store: any
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    ROUTER_BASEPATH: string;
    SYNCANO_PROJECT_INSTANCE: string;
    PUBLIC_URL: string;
    LOCAL_STORAGE_KEY: string;
    SENTRY_DSN: string;
    SENTRY_AUTH_TOKEN: string;
    SENTRY_ORG: string;
    SENTRY_PROJECT: string;
    WORKSPACE_TITLE: string;
    WORKSPACE_LANG: string;
  }
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}
