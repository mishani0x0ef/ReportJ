import { cpSync } from 'fs';

export default function CopyPlugin(dir) {
  return {
    name: 'copy',
    setup(build) {
      cpSync(dir, build.initialOptions.outdir, {
        overwrite: true,
        recursive: true,
      });
      console.info(`[CopyPlugin]\t Copied '${dir}' to output directory`);
    },
  };
}
