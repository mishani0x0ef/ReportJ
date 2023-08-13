import * as esbuild from 'esbuild';
import fs from 'fs';

fs.cpSync('public', 'build', {
  overwrite: true,
  recursive: true,
});

const watch = process.argv.includes('--watch');

const ctx = await esbuild.context({
  entryPoints: ['./src/content/index.tsx'],
  bundle: true,
  minify: !watch,
  outfile: 'build/content.js',
});

watch ? await ctx.watch() : await ctx.rebuild();
