const path = require('path')
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        'bbcodetext.min': './plugins/bbcodetext-plugin.js',
        'canvas.min': './plugins/canvas-plugin.js',
        'clock.min': './plugins/clock-plugin.js',
        'csvtoarray.min': './plugins/csvtoarray.js',
        'csvtohashtable.min': './plugins/csvtohashtable-plugin.js',
        'drag.min': './plugins/drag-plugin.js',
        'dragcursor.min': './plugins/dragcursor-plugin.js',
        'fadeoutdestroy.min': './plugins/fade-out-destroy.js',
        'fade.min': './plugins/fade-plugin.js',
        'gashapon.min': './plugins/gashapon-plugin.js',
        'gridtable.min': './plugins/gridtable-plugin.js',
        'lzstring.min': './plugins/lzstring-plugin.js',
        'runcommands.min': './plugins/runcommands.js',
        'sequence.min': './plugins/sequence-plugin.js',
        'soundfadein.min': './plugins/sound-fade-in.js',
        'soundfadeout.min': './plugins/sound-fade-out.js',
        'tagtext.min': './plugins/tagtext-plugin.js',
        'tcrp.min': './plugins/tcrp-plugin.js',
        'textpage.min': './plugins/textpage-plugin.js',
        'texttyping.min': './plugins/texttyping-plugin.js',
        'webfontloader.min': './plugins/webfontloader-plugin.js',
        'xor.min': './plugins/xor-plugin.js'
    },
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, './plugins/dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
            WEBGL_RENDERER: true,
            CANVAS_RENDERER: true
        }),
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