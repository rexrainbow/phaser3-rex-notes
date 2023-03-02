import phaser from 'phaser/src/phaser.js';
import CanvasPlugin from '../../plugins/canvas-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var { width, height } = this.scale;

        this.add.image(width / 2, height / 2, 'classroom').setAlpha(0.5);

        var canvas = this.add.rexCanvas(0, 0, 130, 130)


        canvas
            .drawFrame(
                'classroom', undefined,
                0, 0, canvas.width, canvas.height,
                -30, -30, canvas.width, canvas.height,
            )


        var debugGraphics = this.add.graphics()

        var DrawBound = function () {
            debugGraphics
                .clear()
                .lineStyle(3, 0xff0000, 1)
                .strokeRectShape(canvas.getBounds())
        }
        DrawBound();

        canvas
            .setInteractive({ draggable: true })
            .on('drag', function (pointer, dragX, dragY) {
                canvas.setPosition(dragX, dragY);

                DrawBound()
            });

    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1024,
    height: 768,
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