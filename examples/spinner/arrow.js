import phaser from 'phaser/src/phaser.js';
import SpinnerPlugin from '../../templates/spinner/spinner-plugin.js';
import Arrow from '../../templates/spinner/arrow/Arrow.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var arrowDown = this.rexSpinner.add.arrow({
            width: 100, height: 100,
            color: 0x00FFFF,
            duration: 1000,
            direction: 'down'
        })
        var arrowUp = this.rexSpinner.add.arrow({
            width: 100, height: 100,
            color: 0x00FFFF,
            duration: 1000,
            direction: 'up'
        })
        var arrowLeft = this.rexSpinner.add.arrow({
            width: 100, height: 100,
            color: 0x00FFFF,
            duration: 1000,
            direction: 'left'
        })
        var arrowRight = this.rexSpinner.add.arrow({
            width: 100, height: 100,
            color: 0x00FFFF,
            duration: 1000,
            direction: 'right'
        })

        Phaser.Actions.GridAlign(
            [
                arrowDown, arrowUp, arrowLeft, arrowRight
            ],
            {
                cellWidth: 100,
                cellHeight: 100,
                position: Phaser.Display.Align.TOP_LEFT,
                x: 200,
                y: 200
            }
        );

        var graphics = this.add.graphics({
            lineStyle: {
                width: 2, color: 0xff0000, alpha: 1
            }
        })
            .strokeRectShape(arrowDown.getBounds())
            .strokeRectShape(arrowUp.getBounds())
            .strokeRectShape(arrowLeft.getBounds())
            .strokeRectShape(arrowRight.getBounds())
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
        scene: [{
            key: 'rexSpinner',
            plugin: SpinnerPlugin,
            mapping: 'rexSpinner'
        }]
    }
};

var game = new Phaser.Game(config);