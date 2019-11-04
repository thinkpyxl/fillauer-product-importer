import path from 'path';

const { resolve } = path;
// const root = resolve(process.env.PWD);
// const theme = `${root}/wp-content/themes/_view`;
// const plugin = `${root}/wp-content/plugins/_core`;
const root = '.';
const theme = '.';
const plugin = '.';

const paths = {
  src: {
    styles: `${root}/src/styles`,
    scripts: `${root}/src/scripts`,
    images: `${root}/src/images`,
    fonts: `${root}/src/fonts`,
    svgs: `${root}/src/svgs`,
    views: `${root}/src/views`,
    blocks: `${root}/src/views/block`,
  },
  dist: {
    styles: `${theme}/dist/styles`,
    scripts: `${theme}/dist/scripts`,
    images: `${theme}/dist/images`,
    fonts: `${theme}/dist/fonts`,
    svgs: `${theme}/dist/svgs`,
    views: `${theme}/dist/views`,
    blocks: `${theme}/dist/views/block`,
  },
};

export { paths, root, theme, plugin };
