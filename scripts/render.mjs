#!/usr/bin/env node
// Render wrapper: adds per-mode codec flags and a timestamped output filename.
//
//   npm run overlay -- <CompositionId> [extra remotion flags]
//   npm run fullframe -- <CompositionId> [extra remotion flags]
//
// Examples:
//   npm run overlay -- Counter
//   npm run overlay -- Counter --props='{"from":100,"to":0}'
//   npm run fullframe -- LowerThird-Vertical

import {spawnSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const [mode, compositionId, ...rawArgs] = process.argv.slice(2);

if (!['overlay', 'fullframe'].includes(mode ?? '') || !compositionId) {
  console.error('Usage: npm run overlay|fullframe -- <CompositionId> [--out-dir=<subfolder>] [extra remotion flags]');
  console.error('Example: npm run overlay -- Counter --out-dir="42_Jane Doe"');
  process.exit(1);
}

// --out-dir=<subfolder> puts renders in out/<subfolder>/ (e.g. one folder per episode).
let outDir = 'out';
const extraArgs = rawArgs.filter((arg) => {
  if (arg.startsWith('--out-dir=')) {
    outDir = path.join('out', arg.slice('--out-dir='.length));
    return false;
  }
  return true;
});

const timestamp = new Date()
  .toISOString()
  .slice(0, 19)
  .replace('T', '_')
  .replaceAll(':', '-');

const modeArgs =
  mode === 'overlay'
    ? [
        // ProRes 4444 with alpha channel, for compositing in DaVinci Resolve.
        '--codec=prores',
        '--prores-profile=4444',
        '--pixel-format=yuva444p10le',
        '--image-format=png',
      ]
    : ['--codec=h264'];

const extension = mode === 'overlay' ? 'mov' : 'mp4';
const outFile = path.join(outDir, `${compositionId}_${mode}_${timestamp}.${extension}`);

mkdirSync(path.join(projectRoot, outDir), {recursive: true});

const remotionBin = path.join(projectRoot, 'node_modules', '.bin', 'remotion');
const result = spawnSync(
  remotionBin,
  ['render', compositionId, outFile, ...modeArgs, ...extraArgs],
  {cwd: projectRoot, stdio: 'inherit'},
);

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}
process.exit(result.status ?? 0);
