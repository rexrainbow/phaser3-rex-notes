import 'phaser';
import SpiralCurvePlugin from '../../plugins/spiralcurve-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
        this.load.atlas('flares', 'assets/images/particles/flares/flares.png', 'assets/images/particles/flares/flares.json');
    }

    create() {
        var cycle = 5;
        var curve = this.plugins.get('rexSpiralCurve').add({
            // Origin
            startX: 400, startY: 400,
            endX: 400, endY: 200,
            // Radius
            startXRadius: 100, endXRadius: 30,
            startYRadius: 50, endYRadius: 15,
            // Angle
            startAngle: 0, endAngle: (360 * cycle)
        });

        var particles = this.add.particles('flares');
        var emitter = particles.createEmitter({
            scale: { start: 0.5, end: 0.3 },
            alpha: { start: 1, end: 0 },
            lifespan: 2000,
            blendMode: 'ADD',
            emitZone: {
                type: 'edge',
                stepRate: 20,
                source: {
                    getPoints(quantity, stepRate) {
                        return curve.getSpacedPoints(undefined, stepRate);
                    }
                }
            },
            speed: 10,
            gravityY: 50
        });

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