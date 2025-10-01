#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const dumpFile = path.join(root, 'Legacy repo dump', 'REPO-ALL(Legacy).md');
const outputDir = path.join(root, 'Legacy repo dump', 'extracted');

if (!fs.existsSync(dumpFile)) {
  console.error(`Legacy dump not found at ${dumpFile}`);
  process.exit(1);
}

const source = fs.readFileSync(dumpFile, 'utf8');
const fencePattern = /^###\s+([^\n]+)\n(?:_[^\n]*\n)?```[a-zA-Z0-9]*\n([\s\S]*?)```/gm;
let match;
let count = 0;

while ((match = fencePattern.exec(source)) !== null) {
  const relativePath = match[1].trim();
  if (!relativePath || relativePath.startsWith('..')) {
    continue;
  }

  const destPath = path.join(outputDir, relativePath);
  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let content = match[2];
  if (!content.endsWith('\n')) {
    content += '\n';
  }

  fs.writeFileSync(destPath, content, 'utf8');
  count += 1;
}

console.log(`Extracted ${count} files into ${outputDir}`);
