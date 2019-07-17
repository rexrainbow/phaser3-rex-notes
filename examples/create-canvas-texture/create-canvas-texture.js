import CreateCanvasTexturePlugin from '../../plugins/createcanvastexture-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        this.plugins.get('rexCreateCanvasTexture')
            .circle({
                key: 'circle',
                width: 64
            })
            .rectangle({
                key: 'rectangle',
                width: 64
            });

        this.add.image(300, 300, 'circle')
            .setTint(0xff0000)
        this.add.image(500, 300, 'rectangle')
            .setTint(0x00ff00)
    }

    update() { }
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexCreateCanvasTexture',
            plugin: CreateCanvasTexturePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);