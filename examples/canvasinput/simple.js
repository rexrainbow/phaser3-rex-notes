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
        var txt0 = CreateCanvasInput(this, 'Apple012345678901234567890123456789').setPosition(400, 200)
        var txt1 = CreateCanvasInput(this, 'A').setPosition(400, 300).appendText('pple')
        var txt2 = CreateCanvasInput(this, 'Apple').setPosition(400, 400).setReadOnly()
    }

    update() { }
}

var CreateCanvasInput = function (scene, text) {
    return scene.add.rexCanvasInput(
        {
            width: 600,

            background: {
                // Solution A
                'focus.stroke': 'red',
            },
            // Solution B
            // focusStyle: {
            //     stroke: 'red',
            // },

            style: {
                fontSize: 24,
                backgroundBottomY: 5,
                backgroundHeight: 24,

                // Solution A
                'cursor.color': 'black',
                'cursor.backgroundColor': 'white',
            },
            // Solution B
            // cursorStyle: {
            //     color: 'black',
            //     backgroundColor: 'white'
            // },

            text: text,

            selectAll: true
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