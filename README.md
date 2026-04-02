# WASM Bash

This is a proof of concept of running Bash running using WASM in the browser.

Based on [this wonderful April Fools' joke tutorial](https://youtu.be/TEq-6AqMFBI).

I'm also using **Full colored light background symbol** as the favicon from [bashlogo.com](https://bashlogo.com/).

## Prerequisites

- A machine with [Windows Subsystem for Linux 2](https://learn.microsoft.com/en-us/windows/wsl/), MacOS or Linux.
- A recent version of [Emscripten](https://emscripten.org/).
- A recent version of [Node.js](https://nodejs.org/en/download).
- Recommended, but optionally, a recent version of [PNPM](https://pnpm.io/installation).
- Probably, a recent version of [Bash](https://www.gnu.org/software/bash/), [GCC](https://gcc.gnu.org/), [Make](https://www.gnu.org/software/make/) etc.

## How to build

```bash
# OPTIONAL: If you want to customize the bash build or use a different version, remove base-5.3/ directory and cache.txt file.

# Then, you can download the source code of bash 5.3 from the official https mirror, customize it and build it.
wget https://ftp.gnu.org/gnu/bash/bash-5.3.tar.gz
tar xf bash-5.3.tar.gz

# Either way, go here next:
mkdir -p build
cd build
emconfigure ../bash/configure --build="$(bash ../bash/support/config.guess)" --host wasm32-unknown-emscripten --cache-file=../cache.txt --without-bash-malloc

# Now, build it like this:
emmake make -j8 LDFLAGS='-sFORCE_FILESYSTEM=1 -sEXPORTED_RUNTIME_METHODS=FS,callMain -sMODULARIZE=1 -sEXPORT_ES6=1 -sEXIT_RUNTIME=1 -sEXPORT_NAME=createBash'

cd ..
ln -s ../../build/bash src/runtime/bash.js
ln -s ../../build/bash.wasm src/runtime/bash.wasm
```

## How to run

```bash
pnpm install # or npm install
pnpm run dev # or npm run dev
```

Then open `http://localhost:8080` in your browser.

## LICENSE

This project is licensed under the [UNLICENSE](https://unlicense.org/). Look at the [LICENSE](LICENSE) file for more details.
