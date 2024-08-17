import phaser from 'phaser/src/phaser.js';
import CanvasPlugin from '../../plugins/canvas-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var canvas0 = this.add.rexCanvas(200, 300, 100, 100, 1).setScale(2)
        var canvas1 = this.add.rexCanvas(600, 300, 100, 100, 2).setScale(2)

        UpdateTexture(canvas0)
        UpdateTexture(canvas1)

        var graphics = this.add.graphics({
            lineStyle: {
                width: 2, color: 0xff0000, alpha: 1
            }
        })
            .strokeRectShape(canvas0.getBounds())
            .strokeRectShape(canvas1.getBounds())
    }

    update() { }
}

var UpdateTexture = function (canvas) {
    canvas.updateTexture(function (canvas, context) {
        context.fillStyle = 'lightgray'; // Background color
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.font = '30px Arial';
        context.fillStyle = 'white';
        context.fillText('ABCD', 0, 30);
    })
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
            key: 'rexCanvas',
            plugin: CanvasPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);