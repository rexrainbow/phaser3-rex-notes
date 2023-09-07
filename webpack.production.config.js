const fs = require('fs')
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(phaserModule, 'src/phaser.js');

const dist = process.env.dist;
const projectMain = process.env.main;
const assetsFolder = process.env.assets;
const htmlTemplate = process.env.htmltemplate || './examples/index.tmpl';

const distFolder = path.resolve(__dirname, dist);

var plugins = [];

plugins.push(
    new webpack.DefinePlugin({
        __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
        WEBGL_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
        CANVAS_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
        "typeof WEBGL_DEBUG": JSON.stringify(false),
    })
)

plugins.push(
    new CleanWebpackPlugin([distFolder])
)

plugins.push(
    new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
    })
)

plugins.push(
    new HtmlWebpackPlugin({
        filename: distFolder + '/index.html',
        template: htmlTemplate,
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
    })
)

if (fs.existsSync(assetsFolder)) {
    plugins.push(
        new CopyWebpackPlugin({
            patterns: [
                { from: assetsFolder, to: distFolder + '/assets/' },
            ],
        })
    )
}

module.exports = {
    mode: 'production',
    entry: {
        app: [
            '@babel/polyfill',
            projectMain
        ],
        vendor: ['phaser']
    },
    output: {
        path: distFolder,
        publicPath: './',
        library: '[name]',
        libraryTarget: 'umd',
        filename: 'js/[name].bundle.js'
    },
    performance: {
        hints: false
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
            }),
        ],
    },
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.ts$/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-typescript'
                    ]
                }
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                    ]
                }
            },
            {
                test: /phaser-split\.js$/,
                use: ['expose-loader?Phaser']
            },
            {
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader'
            }
        ]
    },
    node: {
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            fs: false
        }
    }
}