/*
  Configures how assets served by the browser (e.g. CSS, JS, images) are processed by webpack.
  This is a shared base webpack configuration, and the options may be overridden by consumers of this factory.
  Note that this configuration is used by all asset generation (both for dist and styleguide), so changes apply in both places.

  Paths and such are passed down from the webpack.config.js, this only configures the actions webpack will perform.
*/
const path = require('path');
const glob = require('glob');
const match = require('minimatch');

const webpack = require('webpack');
const SvgStorePlugin = require('webpack-svgstore-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PostCssPipelineWebpackPlugin = require('postcss-pipeline-webpack-plugin');

const webpackMerge = require('webpack-merge');
const SharedConfig = require('./webpack.shared')

module.exports = ({
  entry,
  outputPath ='dist',
  publicPath = './dist/',
  outputScript = '/tmp/bundle.js',
  outputStyle = '/tmp/bundle.css'
}) => {
  return webpackMerge(
    SharedConfig({
      entry,
      outputPath,
      publicPath,
      outputScript
    }),
    {
      workflow: 'browser',
      module: {
        // delete preLoaders key to remove CSS linting.
        preLoaders: [
          {
            test: /\.css$/,
            loader: 'postcss-loader',
          }
        ],
        loaders: [
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('css?-minimize&sourceMap')
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            loader: 'file?context=./source/&name=/assets/fonts/[name]-[md5:hash:hex:8].[ext]'
          },
          {
            test: /\.json$/,
            loader: 'json'
          },
          {
            test: /\.md$/,
            loader: 'null'
          },
          {
            test: /\.(gif|svg)$/i,
            loaders: [
              'file?context=./source/&name=/assets/images/css/[name]-[md5:hash:hex:8].[ext]',
              'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
          },
          {
            test: /\.(jpe?g|png)$/i,
            loaders: [
              'file?name=/assets/images/css/[name]-[md5:hash:hex:8].[ext]',
              'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
          }
        ]
      },
      plugins: [
        new SvgStorePlugin(),
        new ExtractTextPlugin(outputStyle),
        new PostCssPipelineWebpackPlugin({
          suffix: undefined,
          pipeline: require('./postcss-plugins.js')
        })
      ],
      postcss: [
        require('stylelint')(),
        require('postcss-reporter')()
      ]
    }
  );
}

