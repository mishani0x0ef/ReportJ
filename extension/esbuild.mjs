import { context } from 'esbuild';
import { exit } from 'process';
import ClearPlugin from './scripts/clear.mjs';
import CopyPlugin from './scripts/copy.mjs';
import ProgressPlugin from './scripts/progress.mjs';

const watch = process.argv.includes('--watch');

const ctx = await context({
  entryPoints: ['./src/content/index.tsx', './src/popup/index.tsx'],
  bundle: true,
  minify: !watch,
  outdir: 'build',
  plugins: [new ClearPlugin(), new CopyPlugin('public'), new ProgressPlugin()],
});

if (watch) {
  await ctx.watch();
} else {
  const result = await ctx.rebuild();
  const hasErrors = result.errors.length > 0;
  exit(hasErrors ? 1 : 0);
}
