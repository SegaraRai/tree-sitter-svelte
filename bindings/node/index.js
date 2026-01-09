import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "..");

// Detect Bun runtime
const isBun = typeof process.versions.bun === "string";

let binding;
if (isBun) {
  // Bun support - load directly
  const module = await import(`${root}/prebuilds/${process.platform}-${process.arch}/tree-sitter-svelte.node`);
  binding = module.default || module;
} else {
  // Standard Node.js - use node-gyp-build
  const { default: nodeGypBuild } = await import("node-gyp-build");
  binding = nodeGypBuild(root);
}

export const language = binding.language || binding;

// Load node-types.json
let nodeTypeInfo;
try {
  const data = readFileSync(join(root, "src", "node-types.json"), "utf8");
  nodeTypeInfo = JSON.parse(data);
} catch (_) {
  nodeTypeInfo = undefined;
}

export { nodeTypeInfo };

// Lazy-load query files
export function getHighlightsQuery() {
  return readFileSync(join(root, "queries", "highlights.scm"), "utf8");
}

export function getInjectionsQuery() {
  return readFileSync(join(root, "queries", "injections.scm"), "utf8");
}

export function getLocalsQuery() {
  return readFileSync(join(root, "queries", "locals.scm"), "utf8");
}

export function getFoldsQuery() {
  return readFileSync(join(root, "queries", "folds.scm"), "utf8");
}

export function getIndentsQuery() {
  return readFileSync(join(root, "queries", "indents.scm"), "utf8");
}
