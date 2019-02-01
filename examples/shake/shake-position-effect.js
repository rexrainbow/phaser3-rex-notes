import ShakePlugin from '../../plugins/shakeposition-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var dot = this.add.circle(200, 200, 20, 0x888888);
        dot.shake = this.plugins.get('rexShake').add(dot, {
            duration: 1000,
            // magnitude: 50,
            mode: 'effect'
        }).on('complete', function () {
            console.log('complete');
        })
        this.input.on('pointerdown', function (pointer) {
            dot.shake.shake();
        });

        this.dot = dot;
        this.print = this.add.text(0, 0, '');
    }

    update() {
        // Position won't be changed here if mode is 'effect'
        this.print.text = this.dot.x + ',' + this.dot.y;
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