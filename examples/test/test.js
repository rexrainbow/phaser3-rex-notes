'use strict'

var preload = function () {
    var config = {
        google: {
            families: ['Bangers']
        }
    };
    this.load.webFont(config);
};
var create = function () {
    this.add.text(100, 200, 'create stage ', {
        font: '64px Bangers',
        fill: '#7744ff'
    });
};

var sceneConfig = {
    preload: preload,
    create: create,
    pack: {
        files: [{
            type: 'plugin',
            key: 'webfontloader-plugin',
            url: './plugins/dist/webfontloader.js',
            start: true
        }]
    }
};
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: sceneConfig
};
var game = new Phaser.Game(config);