var path = require('path')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser/')
var phaser = path.join(phaserModule, 'src/phaser.js')

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
  WEBGL_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
  CANVAS_RENDERER: true // I did this to make webpack work, but I'm not really sure it should always be true
})

var projectName = process.env.myprojname;
var projectMain = process.env.main;
var distFolder = path.resolve(__dirname, 'app/' + projectName);
var assetsFolder = process.env.assets;

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      projectMain
    ],
    vendor: ['phaser']
  },
  output: {
    path: distFolder, // path.resolve(__dirname, 'build'),
    publicPath: './',
    filename: 'js/bundle.js'
  },
  plugins: [
    definePlugin,
    new CleanWebpackPlugin([distFolder]),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    /*new webpack.optimize.UglifyJsPlugin({
      drop_console: true,
      minimize: true,
      output: {
        comments: false
      }
    }),*/
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' /* chunkName= */, filename: 'js/vendor.bundle.js' /* filename= */ }),
    new HtmlWebpackPlugin({
      filename: distFolder + '/index.html',
      template: './demo/index.html',
      chunks: ['vendor', 'app'],
      chunksSortMode: 'manual',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true
      },
      hash: true
    }),
    new CopyWebpackPlugin([
      { from: assetsFolder, to: distFolder + 'assets/' }
    ])
  ],
  module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
      { test: /phaser-split\.js$/, use: 'raw-loader' },
      { test: [/\.vert$/, /\.frag$/], use: 'raw-loader' }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    alias: {
      'phaser': phaser,

    }
  }
}