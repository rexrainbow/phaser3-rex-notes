import phaser from 'phaser/src/phaser.js';
import WebFontLoaderPlugin from '../../plugins/webfontloader-plugin.js';

class LoadFont extends Phaser.Scene {
    constructor() {
        super({
            key: 'load-font'
        })
    }

    preload() {
        this.load.rexWebFont({
            google: {
                families: ['Exo ']
            },
        });
    }

    create() {
        this.add.text(0, 0, 'Hello', {
            fontSize: '64px',
        });
        this.add.text(0, 100, 'Hello', {
            fontFamily: 'Exo ',
            fontSize: '64px'
        });

        this.add.text(300, 0, 'Hello', {
            fontSize: '64px',
            fontStyle: '700'
        });
        this.add.text(300, 100, 'Hello', {
            fontFamily: 'Exo ',
            fontSize: '64px',
            fontStyle: '700'
        });
    }

    update() { }
}

class StartScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'start'
        })
    }

    create() {
        this.add.text(400, 300, 'Click to load font').setOrigin(0.5);
        this.input.on('pointerup', function () {
            this.scene.start('load-font')
        }, this)
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [StartScene, LoadFont],
    plugins: {
        global: [{
            key: 'WebFontLoader',
            plugin: WebFontLoaderPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);