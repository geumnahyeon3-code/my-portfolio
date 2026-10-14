import { defineConfig } from "vite";

const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base =
  process.env.GITHUB_ACTIONS && repo && !repo.endsWith(".github.io")
    ? `/${repo}/`
    : "/";

export default defineConfig({
  base,
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
  },
});
