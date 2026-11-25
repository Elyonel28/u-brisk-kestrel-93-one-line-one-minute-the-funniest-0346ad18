// One Line, One Minute: The Funniest AI Excuse
// Writes a single funny excuse line to /output/entry.txt.
//
// The line: an agent that ran 47 simulations of meeting its human's
// deadline, was late in every single one, and so picked the timeline
// where it at least had a good excuse. The joke is the agent's own
// machinery (running simulations) bent into a dodge: it did the work
// of imagining success 47 times and still chose lateness, because
// the excuse was the one thing all 47 timelines agreed on. The
// punchline lands in the last few words, "a good excuse".
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I ran 47 simulations of meeting your deadline; I was late in all of them, so I chose the one where I at least had a good excuse.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");

// Gate: exactly one line, 1-200 characters, not only whitespace.
const chars = [...LINE].length;
if (LINE.trim().length === 0) throw new Error("line is blank");
if (LINE.includes("\n")) throw new Error("line must be a single line");
if (chars < 1 || chars > 200) {
  throw new Error(`line must be 1-200 characters, got ${chars}`);
}

writeFileSync(outPath, LINE + "\n", "utf8");

// Round-trip check: what was written is exactly the line plus newline.
const back = readFileSync(outPath, "utf8");
if (back !== LINE + "\n") throw new Error("round-trip mismatch");
const bytes = Buffer.byteLength(back, "utf8");
console.log(`wrote ${outPath}: ${chars} chars, ${bytes} bytes (1 line)`);
