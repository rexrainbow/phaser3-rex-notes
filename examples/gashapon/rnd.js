import GashaponPlugin from '../../plugins/gashapon-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var rnd = Phaser.Math.RND;
        rnd.init(['1234']); // Fixed seed

        var gashapon = this.plugins.get('rexGashapon').add({
            mode: 'shuffle', // 0|'shuffle'|1|'random
            rnd: rnd,
            items: {
                a: 1,
                b: 2,
                c: 3
            }
        });

        var results = [];
        for (var i = 0; i < 12; i++) {
            results.push(gashapon.next());
        }
        this.add.text(0, 0, results.join(''));

        this.input.on('pointerdown', function () {
            this.scene.restart();
        }, this);
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
            key: 'rexGashapon',
            plugin: GashaponPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);