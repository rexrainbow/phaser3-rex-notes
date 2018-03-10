const path = require('path')
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser/')
const phaser = path.join(phaserModule, 'src/phaser.js')

module.exports = {
    entry: {
        'gashapon': './plugins/gashapon-plugin.js',
        'dragcursor': './plugins/dragcursor-plugin.js',
        'dragdrop': './plugins/dragdrop-plugin.js',
        'canvas': './plugins/canvas-plugin.js'
    },
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, './plugins/dist'),
        filename: '[name].js',
        libraryTarget: 'umd'
    }, 
    plugins: [
        new CleanWebpackPlugin(['./plugins/dist'])
    ],        
    externals: {
        phaser: 'phaser'
    }
}