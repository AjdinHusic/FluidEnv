declare global {
  interface Window {
    __ENV?: Record<string, any>;
  }
}