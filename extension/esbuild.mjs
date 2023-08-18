import * as esbuild from 'esbuild';
import fs from 'fs';
import { exit } from 'process';

fs.rmSync('build', { recursive: true });

fs.cpSync('public', 'build', {
  overwrite: true,
  recursive: true,
});

const watch = process.argv.includes('--watch');

const ctx = await esbuild.context({
  entryPoints: ['./src/content/index.tsx', './src/popup/index.tsx'],
  bundle: true,
  minify: !watch,
  outdir: 'build',
});

if (watch) {
  await ctx.watch();
} else {
  const result = await ctx.rebuild();
  exit(Math.min(result.errors.length, 0));
}
