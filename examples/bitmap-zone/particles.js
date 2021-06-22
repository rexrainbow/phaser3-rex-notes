import 'phaser';
import BitmapZonePlugin from '../../plugins/bitmapzone-plugin.js';

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
        var textObject = this.add.text(400, 300, 'Phaser3', {
            fontSize: '160px'
        })
            .setOrigin(0.5)
            .setVisible(false);

        var textZone = this.plugins.get('rexBitmapZone').add(textObject);
        var particles = this.add.particles('flares').setPosition(textObject.x, textObject.y);
        var emitter = particles.createEmitter({
            blendMode: 'ADD',
            scale: { start: 0.1, end: 0.2 },
            quantity: 10,
            speed: 8,
            gravityY: -20,
            emitZone: {
                type: 'random',
                source: textZone
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
        global: [{
            key: 'rexBitmapZone',
            plugin: BitmapZonePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);