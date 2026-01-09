/// <reference types="node" />

import assert from "node:assert";
import { test } from "node:test";
import Parser from "tree-sitter";
import * as Svelte from "./index.js";

test("can load grammar", () => {
  const parser = new Parser();
  assert.doesNotThrow(() => parser.setLanguage(Svelte.language));
});

test("can access queries", () => {
  assert.ok(Svelte.getHighlightsQuery());
  assert.ok(Svelte.getInjectionsQuery());
  assert.ok(Svelte.getLocalsQuery());
  assert.ok(Svelte.getFoldsQuery());
  assert.ok(Svelte.getIndentsQuery());
});

test("has node type info", () => {
  assert.ok(Svelte.nodeTypeInfo !== undefined);
});
