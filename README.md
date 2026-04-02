# Bash WASM

This is a proof of concept of running Bash WASM in the browser.

It is based on [this wonderful April Fools' joke](https://youtu.be/TEq-6AqMFBI).

## Prequisites

- A machine with WSL2 (Windows Subsystem for Linux), MacOS or Linux
- A recent version of [Emscripten](https://emscripten.org/)

## How to build

```bash
# If you want to customize the bash build or use a different version, remove base-5.3/ directory and cache.txt file
# Then, you can download the source code of bash 5.3 from the official https mirror, customize it and build it.
wget https://ftp.gnu.org/gnu/bash/bash-5.3.tar.gz
tar xf bash-5.3.tar.gz

mkdir -p build
cd build
emconfigure ../bash-5.3/configure --build="$(bash ../bash-5.3/support/config.guess)" --host wasm32-unknown-emscripten --cache-file=../cache.txt --without-bash-malloc
emmake make -j8 # or how many cpu threads you have
cd ../web
cp ../build/bash bash.js
cp ../build/bash.wasm .
```

## How to run

```bash
cd web
python3 -m http.server 8080 # or any other http server and port
```

Then open `http://localhost:8000` in your browser.

## LICENSE

This project is licensed under the [UNLICENSE](https://unlicense.org/). Look at the [LICENSE](LICENSE) file for more details.
