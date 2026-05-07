import Phaser from 'phaser';
import RoundrRctanglePlugin from '../../plugins/roundrectangle-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var gameObject = this.add.rexRoundRectangle(100, 100, 400, 400, 30, 0x008888)
            .setStrokeStyle(2, 0x00ff00, 1)
            .setOrigin(0)

        var print = this.add.text(0,0, '');

        var UpdatePointerPosition = function (gameObject, topLeftDragPointer, bottomRightDragPointer) {
            var tlx = gameObject.x, tly = gameObject.y,
                brx = tlx + gameObject.width, bry = tly + gameObject.height;
            topLeftDragPointer.setPosition(tlx, tly);
            bottomRightDragPointer.setPosition(brx, bry);

            print.text = `${gameObject.width}, ${gameObject.height}`
        }

        var topLeftDragPointer = this.add.rectangle(0, 0, 20, 20, 0x880000)
            .setInteractive({ draggable: true })
            .on('drag', function (pointer, dragX, dragY) {
                gameObject.setPosition(dragX, dragY);
                UpdatePointerPosition(gameObject, topLeftDragPointer, bottomRightDragPointer);
            });

        var bottomRightDragPointer = this.add.rectangle(0, 0, 20, 20, 0x880000)
            .setInteractive({ draggable: true })
            .on('drag', function (pointer, dragX, dragY) {
                var width = dragX - topLeftDragPointer.x;
                var height = dragY - topLeftDragPointer.y;
                if ((width < 0) || (height < 0)) {
                    return;
                }
                gameObject.setSize(width, height);
                UpdatePointerPosition(gameObject, topLeftDragPointer, bottomRightDragPointer);
            });

        UpdatePointerPosition(gameObject, topLeftDragPointer, bottomRightDragPointer);
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
            key: 'rexRoundrRctangle',
            plugin: RoundrRctanglePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);