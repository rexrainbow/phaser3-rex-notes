import phaser from 'phaser/src/phaser.js';
import CanvasInputPlugin from '../../plugins/canvasinput-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var txt0 = CreateCanvasInput(this, 'Apple012345678901234567890123456789').setPosition(400, 100)
        var txt1 = CreateCanvasInput(this, 'A').setPosition(400, 200).appendText('pple')
        var txt2 = CreateCanvasInput(this, 'Apple').setPosition(400, 300).setReadOnly()
        var txt3 = CreateCanvasInput(this, 'Apple', 100).setPosition(100, 400).setOrigin(0)

        this.add.text(0, 0, 'Full screen')
            .setInteractive()
            .on('pointerdown', function () {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                    // On stop fulll screen
                } else {
                    this.scale.startFullscreen();
                    // On start fulll screen
                }
            }, this)
    }

    update() { }
}

var CreateCanvasInput = function (scene, text, width) {
    if (width === undefined) {
        width = 600;
    }
    return scene.add.rexCanvasInput(
        {
            width: width,

            background: {
                'focus.stroke': 'red',
            },

            style: {
                fontSize: 24,
                backgroundBottomY: 5,
                backgroundHeight: 24,

                'range.backgroundColor': 'green',

                'cursor.backgroundColor': 'green',
                'cursor.backgroundHeight': 20,
                'cursor.backgroundBottomY': 2,
                'cursor.backgroundRightX': -10,
            },

            text: text,

            selectAll: true
        }
    )
        .on('keydown-ENTER', function (text) {
            console.log(text)
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
            key: 'rexCanvasInput',
            plugin: CanvasInputPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);