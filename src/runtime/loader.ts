import createBash from "./bash";

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
  const module = await createBash({
    noInitialRun: true,
  });

  module.FS.writeFile("/script", src + "\n");
  module.callMain(["/script"]);
};

// Grab all the bash scripts from the page
const scripts = [...document.querySelectorAll("script[type='text/bash']")];

// Run each script
for (const script of scripts) {
  await runBashScript(script.textContent);
}
