import 'phaser';
import ShakePlugin from '../../plugins/shakeposition-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        for (var i = 0; i < 8; i++) {
            let dot = this.add.circle((50 + (i*100)), 300, 20, 0x888888);
            dot.shake = this.plugins.get('rexShake').add(dot, {
                duration: 2000,
                // magnitude: 50,
                mode: 'effect'
            })

            dot
                .setInteractive()
                .on('pointerdown', function () {
                    dot.shake.shake();
                })
        }

        this.add.text(0, 580, 'Click any circle')
    }

    update() {
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
            key: 'rexShake',
            plugin: ShakePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);