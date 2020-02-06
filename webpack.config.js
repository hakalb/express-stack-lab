'use strict';

const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const postcss = require('postcss');
const cssnano = require('cssnano');
const nodeExternals = require('webpack-node-externals');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Convert last dot in path to underscore and remove leading ./
 * @param {*} path Path to convert
 */
const entryName = function(path) {
  return (
    path.slice(2, path.lastIndexOf('.')) +
    '_' +
    path.slice(path.lastIndexOf('.') + 1)
  );
};
/**
 * Convert last underscore in name to dot
 * @param {*} name Name to convert
 */
const fileName = function(name) {
  return (
    name.slice(0, name.lastIndexOf('_')) +
    '.' +
    name.slice(name.lastIndexOf('_') + 1)
  );
};
/**
 * Dynamic entry for special handling of files not available in the normal webpack flow.
 */
const assetsEntry = function() {
  return glob.sync('./assets/**/*.*').reduce((acc, path) => {
    if (path.match(/.*\/(scripts)\/.*(\.(js))$/)) {
      acc[entryName(path)] = path;
    }
    return acc;
  }, {});
};

module.exports = {
  // key name logic for created files
  //  name_ext --> name.ext
  entry: Object.assign(
    {
      server_js: './server.js'
    },
    assetsEntry()
  ),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: chunkdata => fileName(chunkdata.chunk.name)
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails,
    // and __dirname and __filename return blank or /
    __dirname: false,
    __filename: false
  },
  // Need this to avoid error when working with Express
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        // Transpiles modern ES6+ to ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    // Handlebars templates (just copy for now)
    new CopyWebpackPlugin([
      {
        from: 'views/',
        to: 'views/'
      }
    ]),
    // app style assets
    new CopyWebpackPlugin([
      {
        from: 'assets/styles/',
        to: 'assets/styles/',
        transform: async (content, path) => {
          // Optimize app css files
          const result = await postcss(cssnano).process(content.toString(), {
            from: path
          });
          return result.content;
        }
      }
    ]),
    // app style assets
    new CopyWebpackPlugin([
      {
        from: 'assets/images/',
        to: 'assets/images/'
      }
    ]),
    // bootstrap assets
    new CopyWebpackPlugin(
      [
        {
          from: '**/bootstrap.min.*',
          to: 'assets/vendors/bootstrap/[path]/[name].[ext]',
          ignore: ['*.map']
        }
      ],
      { context: 'node_modules/bootstrap' }
    ),
    // jquery assets
    new CopyWebpackPlugin(
      [
        {
          from: '**/jquery.min.*',
          to: 'assets/vendors/jquery/[path]/[name].[ext]',
          ignore: ['*.map']
        }
      ],
      { context: 'node_modules/jquery' }
    ),
    // @fortawesome/fontawesome assets
    new CopyWebpackPlugin(
      [
        {
          from: '**/fontawesome*/**/all.min.js',
          to: 'assets/vendors/@fortawesome/[path]/[name].[ext]'
        }
      ],
      { context: 'node_modules/@fortawesome' }
    ),
    // popper.js assets
    new CopyWebpackPlugin(
      [
        {
          from: '**/umd/popper.min.js',
          to: 'assets/vendors/popper.js/[path]/[name].[ext]'
        }
      ],
      { context: 'node_modules/popper.js' }
    )
  ]
};
