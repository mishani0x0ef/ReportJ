export default function ProgressPlugin() {
  return {
    name: 'progress',
    setup(build) {
      let startTime = 0;

      build.onStart(() => {
        console.info('[ProgressPlugin] Building...');
        startTime = performance.now();
      });

      build.onEnd((result) => {
        const time = performance.now() - startTime;

        console.info(`[ProgressPlugin] Build complete in ${time.toFixed(2)}ms`);
      });
    },
  };
}
