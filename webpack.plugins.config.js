const path = require('path')
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        'canvas': './plugins/canvas-plugin.js',
        'canvas.min': './plugins/canvas-plugin.js',
    },
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, './plugins/dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [
        new CleanWebpackPlugin(['./plugins/dist']),
        new UglifyJSPlugin({
            include: /\.min\.js$/,
            parallel: true,
            sourceMap: false,
            uglifyOptions: {
                compress: true,
                ie8: false,
                ecma: 5,
                output: {
                    comments: false
                },
                warnings: false
            },
            warningsFilter: (src) => false
        })
    ]
}