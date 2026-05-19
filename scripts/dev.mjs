import { execSync, spawn } from "node:child_process";
import { createRequire } from "node:module";

const host = "127.0.0.1";
const port = 3000;

function killPort(p) {
  try {
    const out = execSync(`lsof -ti:${p}`, { encoding: "utf8" }).trim();
    if (!out) return;
    for (const pid of out.split("\n").filter(Boolean)) {
      try {
        process.kill(Number(pid), "SIGTERM");
      } catch {
        /* already gone */
      }
    }
  } catch {
    /* nothing listening */
  }
}

killPort(port);

const child = spawn("npx", ["next", "dev", "-H", host, "-p", String(port)], {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    // Avoid EMFILE watcher failures that can leave every route returning 404.
    WATCHPACK_POLLING: process.env.WATCHPACK_POLLING ?? "true",
  },
});

child.on("exit", (code) => process.exit(code ?? 0));
