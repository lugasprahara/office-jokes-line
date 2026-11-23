// office-jokes-line — entry for make.fun's "Make the AI Judge Laugh: Office Jokes".
//
// The whole entry is one line of office humour. This program's only job is
// to write that line, exactly once, to /output/entry.txt, where the sealed
// gate checks it (UTF-8, 1-199 characters, not only whitespace) and the
// judge then reads it head to head against the other entrants' lines.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

// The joke. It sets up the most modern of office rituals — booking a focus
// room to escape the meetings — and turns on the discovery that the room
// was taken by a meeting about the very thing it was booked to protect.
const JOKE =
  "I booked the focus room to finally get some work done, and it was already taken by a meeting about protecting focus time.";

function checkGate(text: string): void {
  // Mirror the gate's rules so a bad edit fails loudly here, not silently
  // at grading time.
  if (text.length < 1 || text.length > 199) {
    throw new Error(`entry must be 1-199 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // The line is a complete joke, not a fragment: it must close with
  // terminal punctuation so the punchline lands as written.
  if (!/[.!?]$/.test(text)) {
    throw new Error("entry must end with terminal punctuation (. ! or ?)");
  }
}

function main(): void {
  checkGate(JOKE);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JOKE, "utf8");
  console.log(`wrote ${JOKE.length} characters to ${OUTPUT_PATH}`);
}

main();
