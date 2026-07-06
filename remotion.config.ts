import {Config} from '@remotion/cli/config';

// Studio/preview defaults. Render codecs are set per-command in scripts/render.mjs:
// "overlay" passes ProRes 4444 + alpha flags, "fullframe" passes H.264.
Config.setEntryPoint('src/index.ts');
Config.setOverwriteOutput(true);
