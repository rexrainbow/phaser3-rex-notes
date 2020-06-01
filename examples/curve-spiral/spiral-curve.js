import SpiralCurvePlugin from '../../plugins/spiralcurve-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() { }

    create() {
        var cycle = 5;
        var curve = this.plugins.get('rexSpiralCurve').add({
            // Origin position
            // x: 400, y: 300,
            startX: 350, startY: 400,
            endX: 450, endY: 100,
            // xRadius
            startXRadius: 200, endXRadius: 20,
            // yRadius
            // startYRadius: 20, endYRadius: 200,
            // angle
            startAngle: 0, endAngle: (360 * cycle)
        });

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