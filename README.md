# WASM Bash

This is a proof of concept of running Bash WASM in the browser.

It is based on [this wonderful April Fools' joke](https://youtu.be/TEq-6AqMFBI).

I'm also using **Full colored light background symbol** as the favicon from [bashlogo.com](https://bashlogo.com/).

## Prerequisites

- A machine with WSL2 (Windows Subsystem for Linux), MacOS or Linux.
- A recent version of [Emscripten](https://emscripten.org/).

## How to build

```bash
# OPTIONAL: If you want to customize the bash build or use a different version, remove base-5.3/ directory and cache.txt file.
# Then, you can download the source code of bash 5.3 from the official https mirror, customize it and build it.
wget https://ftp.gnu.org/gnu/bash/bash-5.3.tar.gz
tar xf bash-5.3.tar.gz

# Otherwise, start from here:
mkdir -p build
cd build
emconfigure ../bash/configure --build="$(bash ../bash/support/config.guess)" --host wasm32-unknown-emscripten --cache-file=../cache.txt --without-bash-malloc

# Now, build it like this:
emmake make -j8 LDFLAGS='-sFORCE_FILESYSTEM=1 -sEXPORTED_RUNTIME_METHODS=FS,callMain -sMODULARIZE=1 -sEXPORT_ES6=1 -sEXIT_RUNTIME=1 -sEXPORT_NAME=createBash'

ln -s ../../build/bash src/runtime/bash.js
ln -s ../../build/bash.wasm src/runtime/bash.wasm
```

## How to run

```bash
npm run dev
```

Then open `http://localhost:8080` in your browser.

## LICENSE

This project is licensed under the [UNLICENSE](https://unlicense.org/). Look at the [LICENSE](LICENSE) file for more details.
