import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../..", import.meta.url));

const binding = typeof process.versions.bun === "string"
  // Support `bun build --compile` by being statically analyzable enough to find the .node file at build-time
  ? await import(`${root}/prebuilds/${process.platform}-${process.arch}/tree-sitter-svelte.node`)
  : (await import("node-gyp-build")).default(root);

export const language = binding.language || binding;

try {
  binding.nodeTypeInfo = JSON.parse(readFileSync(`${root}/src/node-types.json`, "utf8"));
} catch { }

export const nodeTypeInfo = binding.nodeTypeInfo;

const queries = [
  ["HIGHLIGHTS_QUERY", `${root}/queries/highlights.scm`],
  ["INJECTIONS_QUERY", `${root}/queries/injections.scm`],
  ["LOCALS_QUERY", `${root}/queries/locals.scm`],
  ["TAGS_QUERY", `${root}/queries/tags.scm`],
];

for (const [prop, path] of queries) {
  Object.defineProperty(binding, prop, {
    configurable: true,
    enumerable: true,
    get() {
      delete binding[prop];
      try {
        binding[prop] = readFileSync(path, "utf8");
      } catch { }
      return binding[prop];
    }
  });
}

export function getHighlightsQuery() {
  return readFileSync(`${root}/queries/highlights.scm`, "utf8");
}

export function getInjectionsQuery() {
  return readFileSync(`${root}/queries/injections.scm`, "utf8");
}

export function getLocalsQuery() {
  return readFileSync(`${root}/queries/locals.scm`, "utf8");
}

export function getFoldsQuery() {
  return readFileSync(`${root}/queries/folds.scm`, "utf8");
}

export function getIndentsQuery() {
  return readFileSync(`${root}/queries/indents.scm`, "utf8");
}

export default binding;
