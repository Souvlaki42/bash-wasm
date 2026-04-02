export interface BashModule extends EmscriptenModule {
  FS: {
    writeFile(path: string, data: string | ArrayBufferView): void;
    readFile(path: string, opts?: { encoding?: string }): Uint8Array | string;
    mkdir(path: string): void;
    unlink(path: string): void;
    stat(path: string): unknown;
  };
  callMain(args?: string[]): number | void;
}

declare const createBash: EmscriptenModuleFactory<BashModule>;
export default createBash;
