import phaser from 'phaser/src/phaser.js';
import SpinnerPlugin from '../../templates/spinner/spinner-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var spinners = [];
        for (var i = 0; i < 4; i++) {
            spinners.push(
                this.rexSpinner.add.aio({
                    width: 100, height: 100,
                })
                    .setRandomAnimationMode()
            )
        }

        Phaser.Actions.GridAlign(
            spinners,
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
        for (var i = 0, cnt = spinners.length; i < cnt; i++) {
            graphics.strokeRectShape(spinners[i].getBounds());
        }


        this.input.on('pointerdown', function () {
            for (var i = 0, cnt = spinners.length; i < cnt; i++) {
                spinners[i].setRandomAnimationMode();
                console.log(spinners[i].animationMode);
            }
            console.log('----')
        })
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