import 'phaser';
import SpinnerPlugin from '../../templates/spinner/spinner-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var audio = this.rexSpinner.add.audio({ width: 80, height: 80 });
        var ball = this.rexSpinner.add.ball({ width: 80, height: 80 });
        var bars = this.rexSpinner.add.bars({ width: 80, height: 80 });
        var box = this.rexSpinner.add.box({ width: 80, height: 80 });
        var clock = this.rexSpinner.add.clock({ width: 80, height: 80 });
        var cube = this.rexSpinner.add.cube({ width: 80, height: 80 });
        var dots = this.rexSpinner.add.dots({ width: 80, height: 80 });
        var facebook = this.rexSpinner.add.facebook({ width: 80, height: 80 });
        var grid = this.rexSpinner.add.grid({ width: 80, height: 80 });
        var los = this.rexSpinner.add.los({ width: 80, height: 80 });
        var orbit = this.rexSpinner.add.orbit({ width: 80, height: 80 });
        var oval = this.rexSpinner.add.oval({ width: 80, height: 80 });
        var pie = this.rexSpinner.add.pie({ width: 80, height: 80 });
        var puff = this.rexSpinner.add.puff({ width: 80, height: 80 });
        var radio = this.rexSpinner.add.radio({ width: 80, height: 80 });
        var rings = this.rexSpinner.add.rings({ width: 80, height: 80 });
        var spinner = this.rexSpinner.add.spinner({ width: 80, height: 80, duration: 1500 });

        Phaser.Actions.GridAlign(
            [
                audio, ball, bars, box, clock,
                cube, dots, facebook, grid, los,
                orbit, oval, pie, puff, radio,
                rings, spinner
            ],
            {
                width: 7,
                height: 5,
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