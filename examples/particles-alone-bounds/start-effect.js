import ParticlesAloneBoundsPlugin from '../../plugins/particlesalonebounds-plugin.js';

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
            gameObject._particlesEffect = scene.plugins.get('rexParticlesAloneBounds')
                .startEffect(
                    gameObject,
                    {
                        textureKey: 'flares',
                        scale: { start: 0.3, end: 0.5 },
                        lifespan: 1000,
                        quantity: 80,
                        spread: 20
                    },
                    gameObject._particlesEffect
                )
                .on('complete', function () {
                    console.log('complete')
                })

            gameObject.scene.tweens.add({
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
            key: 'rexParticlesAloneBounds',
            plugin: ParticlesAloneBoundsPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);