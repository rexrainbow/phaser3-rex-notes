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
        var text = this.add.rexCanvasInput(
            {
                x: 400, y: 300,
                width: 400, height: 100,

                background: {
                    stroke: 'white',
                    cornerRadius: 20
                },
                innerBounds: {
                    stroke: 'darkcyan'
                },
                padding: 20,
                style: {
                    fontSize: '20px',
                },

                wrap: {
                    lineHeight: 40,
                    maxLines: 0,       // Set maxLines to 0
                    letterSpacing: 1,
                    padding: { bottom: 10 },
                },

                edit: {
                    onOpen(textObject) {
                        textObject.setBackgroundStroke('red')
                    },

                    onClose(textObject) {
                        textObject.setBackgroundStroke('white')
                    }
                },

                onAddChar(child) {
                    child
                        .setAngle((Math.random() - 0.5) * 30)
                        .modifyStyle({ fontSize: Phaser.Math.Between(20, 30) })
                },

                onMoveCursor(cursorIndex) {
                    console.log(cursorIndex)
                },

                text: 'Phaser',
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
    dom: {
        createContainer: true
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