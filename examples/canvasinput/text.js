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
        var txt0 = CreateCanvasInput(this, 'Phaser').setPosition(400, 200)

        var txt1 = CreateCanvasInput(this, 'P').setPosition(400, 400).appendText('haser')
    }

    update() { }
}

var CreateCanvasInput = function (scene, text) {
    return scene.add.rexCanvasInput(
        {
            width: 600, height: 100,

            background: {
                stroke: 'white',
                cornerRadius: 20
            },
            innerBounds: {
                stroke: 'darkcyan'
            },
            padding: 20,
            style: {
                fontSize: '24px',
            },

            wrap: {
                lineHeight: 40,
                maxLines: 0,       // Set maxLines to 0
                letterSpacing: 1,
                padding: { bottom: 10 },
            },

            onOpen(textObject) {
                textObject.setBackgroundStroke('red')
            },

            onClose(textObject) {
                textObject.setBackgroundStroke('white')
            },

            onAddChar(child) {
                child
                    .setAngle((Math.random() - 0.5) * 30)
                    .modifyStyle({ fontSize: Phaser.Math.Between(20, 30) })
            },

            onCursorOut(child, cursorIndex, textObject) {
                child.modifyStyle({
                    color: 'white',
                    backgroundColor: null
                })
            },

            onCursorIn(child, cursorIndex, textObject) {
                child.modifyStyle({
                    color: 'black',
                    backgroundColor: 'white'
                })
            },

            text: text,
        }
    )
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