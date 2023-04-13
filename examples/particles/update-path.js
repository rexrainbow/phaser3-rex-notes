import phaser from 'phaser/src/phaser.js';

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
        var emitter = this.add.particles(0, 0, 'flares', {
            frame: { frames: ['red', 'green', 'blue'], cycle: true },
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD',
            emitting: false,
        })

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
                emitter.stop().killAll();
            })
            .on('pointermove', function (pointer) {
                if (!pointer.isDown) {
                    return;
                }


                var curve = new Phaser.Curves.Line([pointer.downX, pointer.downY, pointer.x, pointer.y]);
                graphics.clear();
                curve.draw(graphics);

                emitter.emitZones.length = 0;
                emitter.addEmitZone({
                    type: 'edge',
                    source: curve,
                    quantity: 0,
                    stepRate: 20
                })

                emitter.start();
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