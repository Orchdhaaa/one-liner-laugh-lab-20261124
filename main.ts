// One-Liner Laugh Lab — entry program.
// Writes one funny line to entry.txt under MAKEFUN_OUTPUT_DIR (default /output).
// Node 22 stdlib only, no network.
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "I did not eat your sock. I adopted it, and it is now living its best life under the couch.";

// Gate checks: 1-200 chars, single line, no em dash, ends with a period.
const points = [...LINE].length;
if (points < 1 || points > 200) {
  throw new Error(`line is ${points} chars, gate is 1-200`);
}
if (LINE.trim().length === 0) {
  throw new Error("line is whitespace only");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (LINE.includes("—")) {
  throw new Error("line must not contain an em dash");
}
if (!LINE.endsWith(".")) {
  throw new Error("line must end with a period");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE + "\n", "utf8");

// Read-back verification: bytes on disk must equal what we wrote.
const back = readFileSync(outFile, "utf8");
if (back !== LINE + "\n") {
  throw new Error("read-back mismatch");
}
const sha = createHash("sha256").update(back, "utf8").digest("hex");
console.log(`entry.txt: ${points} chars, sha256 ${sha}`);
