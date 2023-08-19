import { rmSync } from 'fs';

export default function ClearPlugin() {
  return {
    name: 'clear',
    setup(build) {
      rmSync(build.initialOptions.outdir, { recursive: true });
      console.log('[ClearPlugin]\t Cleared build directory');
    },
  };
}
