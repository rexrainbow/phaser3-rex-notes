import phaser from 'phaser/src/phaser.js';
import BitmapZonePlugin from '../../plugins/bitmapzone-plugin.js';
import CanvasPlugin from '../../plugins/canvas-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.atlas('flares', 'assets/images/particles/flares/flares.png', 'assets/images/particles/flares/flares.json');
        this.load.image('money', 'assets/images/money.png');
    }

    create() {
        var canvasObject = this.add.rexCanvas(400, 300)
            .loadTexture('money')
            .setScale(10)
            .setVisible(false);

        var canvasZone = this.plugins.get('rexBitmapZone').add(canvasObject);

        var emitter = this.add.particles(400, 300, 'flares', {
            blendMode: 'ADD',
            scale: { start: 0.1, end: 0.2 },
            quantity: 10,
            advance: 1000,
            speed: 8,
            gravityY: -20,
            emitZone: {
                type: 'random',
                source: canvasZone
            }
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
        global: [
            {
                key: 'rexBitmapZone',
                plugin: BitmapZonePlugin,
                start: true
            },
            {
                key: 'rexCanvasPlugin',
                plugin: CanvasPlugin,
                start: true
            },
        ]
    }
};

var game = new Phaser.Game(config);