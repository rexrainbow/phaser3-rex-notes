'use strict'

import WebFontLoaderPlugin from './../../plugins/webfontloader-plugin.js';

var preload = function () {
    this.add.text(100, 100, 'preload stage ', {
        font: '64px Bangers',
        fill: '#7744ff'
    });
};
var create = function () {
    this.add.text(100, 200, 'create stage ', {
        font: '64px Bangers',
        fill: '#7744ff'
    });

    this.add.image(700, 500, 'dot').setScale(10);
};

var sceneConfig = {
    preload: preload,
    create: create,
    pack: {
        files: [{
                type: 'webFont',
                key: 'webfont',
                config: {
                    google: {
                        families: ['Bangers']
                    }
                }
            },
            {
                type: 'image',
                key: 'dot',
                url: 'assets/images/white-dot.png'
            }
        ]
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