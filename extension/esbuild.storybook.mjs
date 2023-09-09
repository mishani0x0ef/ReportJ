import { context } from 'esbuild';
import ClearPlugin from './scripts/clear.mjs';
import CopyPlugin from './scripts/copy.mjs';
import ProgressPlugin from './scripts/progress.mjs';

const ctx = await context({
  entryPoints: ['./storybook/index.tsx'],
  bundle: true,
  minify: false,
  outdir: './build-storybook',
  plugins: [
    new ClearPlugin(),
    new CopyPlugin('./storybook/public'),
    new ProgressPlugin(),
  ],
});

await ctx.watch();
