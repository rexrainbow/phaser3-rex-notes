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
        var curve = this.plugins.get('rexSpiralCurve').add({
            // Origin
            startX: 350, startY: 400,
            endX: 450, endY: 100,
            // Radius
            startRadius: 200, endRadius: 20,
            // Angle
            startAngle: 0, endAngle: (360 * cycle)
        });

        var graphics = this.add.graphics({
            lineStyle: {
                width: 2,
                color: 0xffffff
            }
        })
        var DrawCurve = function (curve, graphics) {
            graphics.clear();
            curve.draw(graphics, (32 * cycle));
        }
        DrawCurve(curve, graphics);

        var startPoint = this.add.circle(curve.startX, curve.startY, 10, 0x6f74dd)
            .setInteractive({ draggable: true })
            .on('drag', function (pointer, dragX, dragY) {
                startPoint.setPosition(dragX, dragY);
                curve.setStartX(dragX).setStartY(dragY);
                DrawCurve(curve, graphics);
            })
        var endPoint = this.add.circle(curve.endX, curve.endY, 10, 0x3949ab)
            .setInteractive({ draggable: true })
            .on('drag', function (pointer, dragX, dragY) {
                endPoint.setPosition(dragX, dragY);
                curve.setEndX(dragX).setEndY(dragY);
                DrawCurve(curve, graphics);
            })
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