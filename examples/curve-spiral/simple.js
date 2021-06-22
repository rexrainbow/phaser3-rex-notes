import 'phaser';
import SpiralCurvePlugin from '../../plugins/spiralcurve-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
    }

    create() {
        var cycle = 5;
        var curve = this.plugins.get('rexSpiralCurve').add(
            400,            // x
            300,            // y
            10,             // start radius
            200,            // end radius
            0,              // start angle
            (-360 * cycle)  // end angle
        );

        var graphics = this.add.graphics({
            lineStyle: {
                width: 2,
                color: 0xffffff
            }
        })
        curve.draw(graphics, (32 * cycle));
    }
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
            key: 'rexSpiralCurve',
            plugin: SpiralCurvePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);