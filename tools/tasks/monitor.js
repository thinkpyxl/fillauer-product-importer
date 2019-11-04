import { series, watch } from 'gulp';
import { quit, reload } from './serve';
import { theme, plugin } from '../utils/paths';
import { scripts, globalStyles, blockStyles, tailwindStyles, svgs, fonts, clean, sprite, templates, php } from '../index';

function monitor(cb) {
  watch(
    [
      'tools/**/*',
      'gulpfile.babel.js',
      'postcss.config.js',
      'babel.config.js',
      'package.json',
    ],
    quit,
  );
  watch(
    [
      'src/**/*.js',
      'views/**/*.js',
    ],
    series(
      scripts,
      reload,
    ),
  );
  cb();
}

export { monitor };
