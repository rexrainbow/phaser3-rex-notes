import 'phaser';
import PerlinGrivatyWellPlugin from '../../plugins/perlingrivatywell-plugin.js';

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
            speed: 300,
            lifespan: 1000,
            scale: 0.1,
            quantity: 5
        })
            .setPosition(400, 300)

        var perlinGrivatyWell = this.plugins.get('rexPerlinGrivatyWell').add();
        particles.addGravityWell(perlinGrivatyWell);

        this.input.on('pointermove', function (pointer) {
            emitter.setPosition(pointer.x, pointer.y)
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
                key: 'rexPerlinGrivatyWell',
                plugin: PerlinGrivatyWellPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);