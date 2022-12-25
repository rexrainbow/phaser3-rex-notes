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
        this.add.rexCanvasInput(
            {
                x: 400, y: 300,

                width: 300, height: 200,

                background: {
                    stroke: 'white',

                    'focus.stroke': 'red',
                },

                style: {
                    fontSize: 20,
                    backgroundBottomY: 1,
                    backgroundHeight: 20,

                    'cursor.color': 'black',
                    'cursor.backgroundColor': 'white',
                },

                textArea: true,

                text: '12345',
            }
        )
    }

    update() { }
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