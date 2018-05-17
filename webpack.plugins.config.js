const path = require('path')
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        'bbcodetext': './plugins/bbcodetext-plugin.js',
        'canvas': './plugins/canvas-plugin.js',
        'clock': './plugins/clock-plugin.js',
        'csvtoarray': './plugins/csvtoarray.js',
        'csvtohashtable': './plugins/csvtohashtable-plugin.js',
        'drag': './plugins/drag-plugin.js',
        'dragcursor': './plugins/dragcursor-plugin.js',
        'fadeoutdestroy': './plugins/fade-out-destroy.js',
        'fade': './plugins/fade-plugin.js',
        'gashapon': './plugins/gashapon-plugin.js',
        'gridtable': './plugins/gridtable-plugin.js',
        'lzstring': './plugins/lzstring-plugin.js',
        'runcommands': './plugins/runcommands.js',
        'sequence': './plugins/sequence-plugin.js',
        'soundfadein': './plugins/sound-fade-in.js',
        'soundfadeout': './plugins/sound-fade-out.js',
        'tagtext': './plugins/tagtext-plugin.js',
        'tcrp': './plugins/tcrp-plugin.js',
        'textpage': './plugins/textpage-plugin.js',
        'texttyping': './plugins/texttyping-plugin.js',
        'webfontloader': './plugins/webfontloader-plugin.js',
        'xor': './plugins/xor-plugin.js'
    },
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, './plugins/dist'),
        filename: '[name].min.js',
        library: {
            root: 'rex[name]'
        },
        libraryTarget: 'umd',
        umdNamedDefine: true,
        libraryExport: 'default'
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