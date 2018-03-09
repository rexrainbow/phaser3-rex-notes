var path = require('path')
var webpack = require('webpack')

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser/')
var phaser = path.join(phaserModule, 'src/phaser.js')

module.exports = {
    entry: {
        gashapon: ['./plugins/gashapon-plugin.js'],
        dragcursor: ['./plugins/dragcursor-plugin.js'],
        dragdrop: ['./plugins/dragdrop-plugin.js'],
        canvas: ['./plugins/canvas-plugin.js']
    },
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, './plugins/dist'),
        filename: '[name].js',
        //chunkFilename: '[name].min.js',
        libraryTarget: 'umd',
        library: "rexPlugins"
    }, 
    externals: {
        phaser: 'phaser'
    }
}