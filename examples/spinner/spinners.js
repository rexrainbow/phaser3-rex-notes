import SpinnerPlugin from '../../templates/spinner/spinner-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var ball = this.rexSpinner.add.ball({ width: 80, height: 80 });
        var clock = this.rexSpinner.add.clock({ width: 80, height: 80 });
        var dots = this.rexSpinner.add.dots({ width: 80, height: 80 });
        var los = this.rexSpinner.add.los({ width: 80, height: 80 });
        var orbit = this.rexSpinner.add.orbit({ width: 80, height: 80 });
        var puff = this.rexSpinner.add.puff({ width: 80, height: 80 });
        var rings = this.rexSpinner.add.rings({ width: 80, height: 80 });

        Phaser.Actions.GridAlign(
            [ball, clock, dots, los, orbit, puff, rings],
            {
                width: 700,
                height: 500,
                cellWidth: 100,
                cellHeight: 100,
                position: Phaser.Display.Align.TOP_LEFT,
                x: 100,
                y: 100
            }
        );
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