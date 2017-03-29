const gulp = require('gulp');
const file = require('gulp-file');
const merge = require('gulp-merge');
const print = require('gulp-print');
const fs = require('fs');
const Dom = require('react-dom/server');

const { dest } = require('./lib/path-helpers');


const getContextList = (context, normalizePath, prefix = false) =>
  context.keys()
    .filter(key => key.indexOf('.test.jsx') === -1)
    .map((key) => {
      if (prefix) {
        const full = key.substr(0, key.indexOf('.jsx')).substr(1);
        const name = full.substr(full.lastIndexOf('/'));

        return {
          isStyleguide: true,
          outputPath: `${prefix}${name}.html`,
          moduleName: `/${prefix}${name}`
        };
      }

      const full = key.substr(0, key.indexOf('.jsx')).substr(1);
      return {
        isStyleguide: false,
        outputPath: `${full.substr(1)}.html`,
        moduleName: full
      };
    });


const createComponentFile = ({
  pathInfo,
  getModule,
  dllStats,
  buildStats,
  pageTemplate,
styleguideTemplate
}) => {
  const template = pathInfo.isStyleguide ? styleguideTemplate : pageTemplate;
  const module = getModule(pathInfo.moduleName);

  const output =
    template.toString()
      .replace('{{title}}', module.pageTitle)
      .replace('{{output}}', Dom.renderToStaticMarkup(module.Component))
      .replace(/\{\{dll-hash\}\}/g, dllStats.hash)
      .replace(/\{\{build-hash\}\}/g, buildStats.hash);

  return file(pathInfo.outputPath, output, { src: true });
};

module.exports = () => {
  const pageTemplate = fs.readFileSync(dest('_skeleton.html'));
  const styleguideTemplate = fs.readFileSync(dest('_skeleton.styleguide.html'));

  const staticStats = require(dest('static-stats.json'));
  const buildStats = require(dest('build-stats.json'));
  const dllStats = require(dest('assets/dlls/dll-stats.json'));

  const {
    pagesContext,
    componentsContext,
    tagsContext,
    getModule,
    normalizePath
  } = require(dest(`assets/static-${staticStats.hash}.js`));

  const pagesToRender = (
    []
    .concat(
      getContextList(pagesContext, normalizePath),
      getContextList(componentsContext, normalizePath, 'styleguide/components'),
      getContextList(tagsContext, normalizePath, 'styleguide/tags')
    )
    .map(pathInfo => createComponentFile({
      pathInfo,
      getModule,
      dllStats,
      buildStats,
      pageTemplate,
      styleguideTemplate
    }))
  );

  return merge(...pagesToRender)
    .pipe(print())
    .pipe(gulp.dest(dest()));
};