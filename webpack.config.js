const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const projectMain = process.env.main;
const assetsFolder = process.env.assets || './assets';
const htmlTemplate = process.env.htmltemplate || './examples/index.tmpl';
const usePluginTransformRuntime = process.env.usePluginTransformRuntime || false;

var plugins = [];
if (usePluginTransformRuntime) {
    plugins.push('@babel/plugin-transform-runtime');
}

module.exports = {
    mode: 'development',
    entry: {
        app: [
            projectMain
        ]
    },
    devtool: 'eval-source-map',
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'watch-dist'),
        publicPath: './watch-dist/',
        library: '[name]',
        libraryTarget: 'umd',
        filename: '[name].js'
    },
    watch: true,
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),            
            "typeof WEBGL_DEBUG": JSON.stringify(false),
            WEBGL_DEBUG: JSON.stringify(false),
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: htmlTemplate,
            chunks: ['app'],
            chunksSortMode: 'manual',
            minify: {
                removeAttributeQuotes: false,
                collapseWhitespace: false,
                html5: false,
                minifyCSS: false,
                minifyJS: false,
                minifyURLs: false,
                removeComments: false,
                removeEmptyAttributes: false
            },
            hash: false
        }),
        new BrowserSyncPlugin({
            host: process.env.IP || 'localhost',
            port: process.env.PORT || 3000,
            server: {
                baseDir: './',
                routes: {
                    '/assets': assetsFolder,
                }
            },
        })
    ],
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
                    ],
                    plugins: plugins
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                    ],
                    plugins: plugins
                }
            },
            {
                test: /phaser-split\.js$/,
                use: ['expose-loader?Phaser']
            },
            {
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader'
            },
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