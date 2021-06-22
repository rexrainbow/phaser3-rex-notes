import 'phaser';

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
        var particles = this.add.particles('flares');
        var emitter = particles.createEmitter({
            frame: { frames: ['red', 'green', 'blue'], cycle: true },
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD'
        });
        var graphics = this.add.graphics({
            lineStyle: {
                width: 2,
                color: 0xffffff,
                alpha: 1
            }
        });
        this.input
            .on('pointerup', function (pointer) {
                graphics.clear();
                emitter
                    .setEmitZone()
                    .stop()
            }, this)
            .on('pointermove', function (pointer) {
                if (!pointer.isDown) {
                    return;
                }

                graphics.clear();
                var curve = new Phaser.Curves.Line([pointer.downX, pointer.downY, pointer.x, pointer.y])
                curve.draw(graphics);
                emitter.setEmitZone({
                    type: 'edge',
                    source: curve,
                    quantity: 0,
                    stepRate: 20
                })
                    .start();
            }, this)
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
    scene: Demo
};

var game = new Phaser.Game(config);