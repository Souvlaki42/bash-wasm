import createBash from "./bash";

// WARNING: Unsupported syscalls: getresgid32 and wait4
const LOG_UNSUPPORTED_SYSCALLS = false;

// Define the new web builtin
globalThis.__bash_web_internal = async (argv) => {
  const [cmd, ...args] = argv;

  switch (cmd) {
    case "dom.write":
      const [selector, content] = args;
      const el = document.querySelector(selector);
      if (!el) return 1;
      el.textContent = content ?? "";
      return 0;
    case "document.title":
      const [title] = args;
      document.title = title ?? "";
      return 0;
    default:
      console.error(`unknown command: ${cmd}`);
      return 1;
  }
};

// Run a bash script using the emscripten bash build
const runBashScript = async (src: string) => {
  const instance = await createBash({
    noInitialRun: true,
    printErr: (text) => {
      const lowercaseText = text.toLowerCase();
      if (
        !LOG_UNSUPPORTED_SYSCALLS &&
        lowercaseText.includes("unsupported syscall")
      )
        return;
      if (lowercaseText.includes("warning")) return console.warn(text);
      console.error(text);
    },
  });

  instance.FS.writeFile("/script", src + "\n");
  instance.callMain(["/script"]);
};

// Grab all the bash scripts from the page
const scripts = [...document.querySelectorAll("script[type='text/bash']")];

// Run each script
for (const script of scripts) {
  await runBashScript(script.textContent);
}
