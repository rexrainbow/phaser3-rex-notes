import WebFontLoaderPlugin from '../../plugins/webfontloader-plugin.js';

class LoadFont extends Phaser.Scene {
    constructor() {
        super({
            key: 'load-font'
        })
    }

    preload() {
        var config = {
            google: {
                families: ['Noto Sans Hebrew']
            },
            testString: 'ש'
            // testString: { 'Noto Sans Hebrew': 'ש' }
        };
        this.load.rexWebFont(config);
    }

    create() {
        this.add.text(100, 0, 'Default ', {
            fontSize: '64px'
        });
        this.add.text(100, 100, 'Hello', {
            fontFamily: 'Noto Sans Hebrew',
            fontSize: '64px'
        });
        this.add.text(100, 200, 'שלום עולם!', {
            fontFamily: 'Noto Sans Hebrew',
            fontSize: '64px',
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