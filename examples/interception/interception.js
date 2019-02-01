import InterceptionPlugin from '../../plugins/interception-plugin.js';
import BulletPlugin from '../../plugins/bullet-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {}

    create() {
        // Target
        var target = this.add.line(800, 200, 30, 0, 0, 0, 0x00cccc)
            .setLineWidth(4, 15)
            .setAngle(180);
        target.bullet = this.plugins.get('rexBullet').add(target, {
            speed: 100
        });
        target.body.setSize(30, 30);

        // Tracer
        var tracer = this.add.line(600, 500, 30, 0, 0, 0, 0x00cc00)
            .setLineWidth(4, 15)
            .setAngle(270);
        tracer.bullet = this.plugins.get('rexBullet').add(tracer, {
            speed: 90,
        });
        tracer.body.setSize(30, 30);
        tracer.interception = this.plugins.get('rexInterception').add(tracer, {
            target: target,
            // enable: false
        });

        this.physics.add.collider(target, tracer, function (target, tracer) {
            target.bullet.setEnable(false);
            tracer.bullet.setEnable(false);
            tracer.interception.setTarget(undefined);
        });

        this.target = target;
        this.tracer = tracer;
        this.graphics = this.add.graphics();
    }

    update() {
        var interception = this.tracer.interception;
        if (interception.target) {
            this.tracer.rotation = interception.predictedAngle;

            this.graphics
                .clear()
                .fillStyle(0xff0000)
                .fillPointShape(interception.predictedPosition, 10);
        }
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
    backgroundColor: 0x333333,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    plugins: {
        global: [{
                key: 'rexBullet',
                plugin: BulletPlugin,
                start: true
            },
            {
                key: 'rexInterception',
                plugin: InterceptionPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);