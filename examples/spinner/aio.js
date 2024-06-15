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
        var spinners = [
            this.rexSpinner.add.aio({ width: 100, height: 100, animationMode: 'leftArrow' }),
            this.rexSpinner.add.aio({ width: 100, height: 100, animationMode: 'rightArrow' }),
            this.rexSpinner.add.aio({ width: 100, height: 100, animationMode: 'upArrow' }),
            this.rexSpinner.add.aio({ width: 100, height: 100, animationMode: 'downArrow' }),
        ];
        for (var i = 0; i < 12; i++) {
            spinners.push(
                this.rexSpinner.add.aio({ width: 100, height: 100, })
            )
        }

        Phaser.Actions.GridAlign(
            spinners,
            {
                width: 4,
                cellWidth: 100,
                cellHeight: 100,
                position: Phaser.Display.Align.TOP_LEFT,
                x: 200,
                y: 100
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