import { rmSync, existsSync } from 'fs';

export default function ClearPlugin() {
  return {
    name: 'clear',
    setup(build) {
      if (!existsSync(build.initialOptions.outdir)) {
        return;
      }

      rmSync(build.initialOptions.outdir, { recursive: true });
      console.log('[ClearPlugin]\t Cleared build directory');
    },
  };
}
