const path = require('path')
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        // game objects
        'bbcodetextplugin': './plugins/bbcodetext-plugin.js',
        'canvasplugin': './plugins/canvas-plugin.js',
        'gridtableplugin': './plugins/gridtable-plugin.js',
        'tagtextplugin': './plugins/tagtext-plugin.js',

        // custom file loader      
        'webfontloaderplugin': './plugins/webfontloader-plugin.js',

        // functions
        'xorplugin': './plugins/xor-plugin.js',
        'lzstringplugin': './plugins/lzstring-plugin.js',
        'csvtoarrayplugin': './plugins/csvtoarray-plugin.js',
        'sequenceplugin': './plugins/sequence-plugin.js',

        // input
        'dragplugin': './plugins/drag-plugin.js',
        'sliderlugin': './plugins/slider-plugin.js',
        'dragcursorplugin': './plugins/dragcursor-plugin.js',
        'dragdeltaplugin': './plugins/dragdelta-plugin.js',

        // member of game object
        'fadeplugin': './plugins/fade-plugin.js',

        // member of text
        'texttypingplugin': './plugins/texttyping-plugin.js',
        'textpageplugin': './plugins/textpage-plugin.js',

        // member of scene 
        'fsmplugin': './plugins/fsm-plugin.js',
        'clockplugin': './plugins/clock-plugin.js',
        'csvtohashtableplugin': './plugins/csvtohashtable-plugin.js',
        'tcrpplugin': './plugins/tcrp-plugin.js',
        'csvscenarioplugin': './plugins/csvscenario-plugin.js',
        'gashaponplugin': './plugins/gashapon-plugin.js'
    },
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, './plugins/dist'),
        filename: 'rex[name].min.js',
        library: {
            root: 'rex[name]'
        },
        libraryTarget: 'umd',
        umdNamedDefine: true,
        libraryExport: 'default'
    },
    performance: {
        hints: false
    },
    optimization: {
        minimizer: [
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
                warningsFilter: () => false
            })
        ]
    },    
    plugins: [
        new CleanWebpackPlugin(['./plugins/dist'])
    ],
    resolve: {
        alias: {
            'rexPlugins': path.resolve(__dirname, 'plugins/')
        }
    }
}