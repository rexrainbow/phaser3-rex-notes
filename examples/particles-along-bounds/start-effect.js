import 'phaser';
import ParticlesAlongBoundsPlugin from '../../plugins/particlesalongbounds-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.clock;
        this.text;
    }

    preload() {
        this.load.atlas('flares', 'assets/images/particles/flares/flares.png', 'assets/images/particles/flares/flares.json');
    }

    create() {
        CreateGO(this, 0x333333, 400, 300, 30);
        CreateGO(this, 0x666666, 430, 360, 80);
    }

    update() { }
}

var depthIdx = 0;
var CreateGO = function (scene, color, x, y, angle) {
    if (angle === undefined) {
        angle = 0;
    }
    var gameObject = scene.add.rectangle(x, y, 200, 300, color)
        .setAngle(angle)
        .setDepth(depthIdx++)
        .setInteractive()
        .on('pointerup', function () {
            scene.plugins.get('rexParticlesAlongBounds')
                .startEffect(
                    gameObject,
                    {
                        textureKey: 'flares',
                        scale: { start: 0.3, end: 0.5 },
                        // alpha: { start: 1, end: 0.1 },
                        // duration: 3000,
                        // lifespan: 1000,
                        // stepRate: 10,
                        spread: 20,
                        //gravityY: -50
                    }
                )
                .once('complete', function () {
                    console.log('complete')
                })

            scene.tweens.add({
                targets: gameObject,
                duration: 1000,
                angle: '+=30',
                repeat: 0,
                yoyo: true
            })
        })
    return gameObject
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
            key: 'rexParticlesAlongBounds',
            plugin: ParticlesAlongBoundsPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);