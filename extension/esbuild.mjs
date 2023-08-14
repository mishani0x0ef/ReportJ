import * as esbuild from 'esbuild';
import fs from 'fs';

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

watch ? await ctx.watch() : await ctx.rebuild();
