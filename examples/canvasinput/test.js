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
        CreateCanvasInput(this, 'Apple').setPosition(400, 300)
    }

    update() { }
}

var CreateCanvasInput = function (scene, text) {
    return scene.add.rexCanvasInput(
        {
            width: 600, height: 100,

            background: {
                stroke: 'white',
                cornerRadius: 20,

                'focus.stroke': 'red',
            },


            innerBounds: {
                stroke: 'darkcyan'
            },
            padding: 20,
            style: {
                fontSize: 24,
                backgroundBottomY: 8,
                backgroundHeight: 32,

                'cursor.color': 'black',
                'cursor.backgroundColor': 'white',
            },

            wrap: {
                lineHeight: 40,              
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