import 'phaser';
import GesturesPlugin from '../../plugins/gestures-plugin.js';
import DragPlugin from '../../plugins/drag-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var gameObject = this.add.rectangle(400, 300, 64, 64, 0x880000)
        var drag = this.plugins.get('rexDrag').add(gameObject, { enable: false })
        gameObject
            .on('dragend', function () {
                drag.setEnable(false);
                gameObject.setFillStyle(0x880000);
            })

        var press = this.rexGestures.add.press(gameObject)
            .on('pressstart', function (press, gameObject, lastPointer) {
                drag
                    .setEnable(true)
                    .drag();
                gameObject.setFillStyle(0xff0000);
            })

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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexDrag',
            plugin: DragPlugin,
            start: true
        }],
        scene: [{
            key: 'rexGestures',
            plugin: GesturesPlugin,
            mapping: 'rexGestures'
        }]
    }
};

var game = new Phaser.Game(config);