import CreateDashedTexture from '../../plugins/utils/texture/CreateDashedTexture.js';
import LinePlugin from '../../plugins/line-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        CreateDashedTexture(this, 'dashed', 10, 0.4, 0xff0000);

        var line = this.add.rexLine({
            start: {
                x: 400, y: 300,
            },
            end: {
                x: 600, y: 300
            },

            body: {
                key: 'dashed',
                width: 5,
            }
        });

        this.input.on('pointermove', function (pointer) {
            line.setLineEndPosition(pointer.x, pointer.y);
        })
    }

    update() { }
}

var config = {
    type: Phaser.CANVAS,
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
            key: 'rexLine',
            plugin: LinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);