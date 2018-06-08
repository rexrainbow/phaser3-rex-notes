'use strict'

import Phaser from 'phaser';

var sceneConfig = {
    key: 'examples',
    pack: {
        files: [{
            type: 'plugin',
            key: 'rexwebfontloaderplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/plugins/dist/rexwebfontloaderplugin.min.js',
            start: true
        }]
    }
};

class Demo extends Phaser.Scene {
    constructor() {
        super(sceneConfig)
    }

    preload() {
        this.plugins.get('rexwebfontloaderplugin').addToScene(this);

        var config = {
            google: {
                families: ['Bangers']
            }
        };
        this.load.rexWebFont(config);
    }

    create() {
        this.add.text(100, 0, 'Default ', {
            fontSize: '64px'
        });        
        this.add.text(100, 100, 'Hello ', {
            fontFamily: 'Bangers',
            fontSize: '64px'
        });
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);