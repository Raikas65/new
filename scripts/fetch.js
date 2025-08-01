// Atsisiunčia oficialų TogetherJS hub/server.js į ./hub/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'https://raw.githubusercontent.com/jsfiddle/togetherjs/master/hub/server.js';
const outDir = path.resolve(__dirname, '..', 'hub');
const outFile = path.join(outDir, 'server.js');

async function main() {
  await fs.promises.mkdir(outDir, { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status} ${res.statusText}`);
  const text = await res.text();
  await fs.promises.writeFile(outFile, text, 'utf8');
  console.log('Downloaded TogetherJS hub/server.js');
}
main().catch(err => {
  console.error(err);
  process.exit(1);
});
