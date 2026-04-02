export {};

declare global {
  var __bash_web_internal: (argv: string[]) => Promise<number>;
}
