import FlashPlugin from '../../plugins/flash-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var dot = this.add.circle(200, 200, 20, 0x888888);
        dot.flash = this.plugins.get('rexFlash').add(dot, {
            duration: 1000,
            repeat: 2
        }).on('complete', function () {
            console.log('complete');
        })
        this.input.on('pointerdown', function (pointer) {
            dot.flash.flash();
        });
    }

    update() {}
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
            key: 'rexFlash',
            plugin: FlashPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);