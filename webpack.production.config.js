const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(phaserModule, 'src/phaser.js');

const projectName = process.env.myprojname;
const projectMain = process.env.main;
const assetsFolder = process.env.assets;
const htmlTemplate = process.env.htmltemplate || './examples/index.tmpl';

const distFolder = path.resolve(__dirname, 'app/' + projectName);

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
            new UglifyJSPlugin({
                include: /.js$/,
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
                warningsFilter: () => false
            })
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
            WEBGL_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
            CANVAS_RENDERER: true // I did this to make webpack work, but I'm not really sure it should always be true
        }),
        new CleanWebpackPlugin([distFolder]),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
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
        }),
        new CopyWebpackPlugin([{
            from: assetsFolder,
            to: distFolder + '/assets/'
        }])
    ],
    module: {
        rules: [{
                test: /\.js$/,
                use: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /phaser-split\.js$/,
                use: 'raw-loader'
            },
            {
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'phaser': phaser,
            // 'rexPlugins': path.resolve(__dirname, 'plugins/'),
            // 'rexTemplates': path.resolve(__dirname, 'templates/'),
        }
    }
}