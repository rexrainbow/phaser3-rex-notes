'use strict';

const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {

    context: `${__dirname}/src/`,

    entry: {
        BasePlugin: './main.js',
        'BasePlugin.min': './main.js'
    },

    output: {
        path: `${__dirname}/dist/`,
        filename: '[name].js',
        library: 'BasePlugin',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    plugins: [

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

};
