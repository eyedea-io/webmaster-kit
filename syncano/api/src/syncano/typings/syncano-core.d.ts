export interface Logger {
  warn: (...messages: any[]) => void;
  debug: (...messages: any[]) => void;
  info: (...messages: any[]) => void;
  error: (...messages: any[]) => void;
  listen: (callback: (event: Object) => void) => void;
}
