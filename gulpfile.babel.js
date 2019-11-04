import { series, parallel } from 'gulp';
import { scripts, clean, monitor, vendors } from './tools/index';
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
    scripts,
    vendors,
  ),
);

const prod = series(
  clean,
  parallel(
    scripts,
    vendors,
  ),
);

export {
  build,
  start,
  prod
};
