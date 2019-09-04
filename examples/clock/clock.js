import ClockPlugin from '../../plugins/clock-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        this.clock = this.plugins.get('rexClock').add(this);
        this.clock.start();
        this.text = this.add.text(100, 100, '');

        this.input.on('pointerdown', this.clock.pause, this.clock);
        this.input.on('pointerup', this.clock.resume, this.clock);
    }

    update() {
        this.text.setText(this.clock.now * 0.001);
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
            key: 'rexClock',
            plugin: ClockPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);