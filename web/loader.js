import createBash from "./bash.js";

const runBashScript = async (src) => {
  const module = await createBash({
    noInitialRun: true,
  });

  module.FS.writeFile("/script", src + "\n");
  module.callMain(["/script"]);
};

const scripts = [...document.querySelectorAll("script[type='text/bash']")];

for (const script of scripts) {
  await runBashScript(script.textContent);
}
