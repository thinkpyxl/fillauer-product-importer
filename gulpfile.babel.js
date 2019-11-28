import { series, parallel } from 'gulp';
import { scripts, globalStyles, clean, monitor, vendors } from './tools/index';
import { serve } from './tools/tasks/serve';

const start = series(
  parallel(
    serve,
    monitor,
  ),
);

const build = series(
  clean,
  series(
    globalStyles,
    scripts,
    vendors,
  ),
);

const prod = series(
  clean,
  parallel(
    globalStyles,
    scripts,
    vendors,
  ),
);

export {
  build,
  start,
  prod
};
