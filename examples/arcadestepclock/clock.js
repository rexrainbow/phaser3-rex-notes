import 'phaser';
import ArcadeStepClockPlugin from '../../plugins/arcadestepclock-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        this.clock = this.plugins.get('rexClock').add(this);
        this.clock.start();
        this.text = this.add.text(100, 100, '');

        this.input.on('pointerdown', this.physics.pause, this.physics);
        this.input.on('pointerup', this.physics.resume, this.physics);

        this.physics.add.existing(this.add.circle(400, 300, 20, 0xff0000));
    }

    update() {
        this.text.setText(this.clock.now);
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
    physics: {
        default: 'arcade'
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexClock',
            plugin: ArcadeStepClockPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);