import 'phaser';
import GesturesPlugin from '../../plugins/gestures-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var gameObject = this.add.rectangle(400, 300, 64, 64, 0x880000)
            .setData('draggable', undefined)
            .setInteractive({ draggable: true })
            .on('drag', function (pointer, dragX, dragY) {
                if (!gameObject.getData('draggable')) {
                    return;
                }
                gameObject.setPosition(dragX, dragY);
            })
            .on('dragend', function () {
                gameObject
                    .setData('draggable', false)
                    .setFillStyle(0x880000);
            })

        var press = this.rexGestures.add.press(gameObject)
            .on('pressstart', function (press, gameObject, lastPointer) {
                gameObject
                    .setData('draggable', true)
                    .setFillStyle(0xff0000);
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
        scene: [{
            key: 'rexGestures',
            plugin: GesturesPlugin,
            mapping: 'rexGestures'
        }]
    }
};

var game = new Phaser.Game(config);