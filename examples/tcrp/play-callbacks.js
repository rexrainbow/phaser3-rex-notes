import phaser from 'phaser/src/phaser.js';
import TCRPPlugin from '../../plugins/tcrp-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var print = function (msg) {
            console.log(msg);
        }

        var player = this.plugins.get('rexTCRP').addPlayer(this);
        player
            .clear()
            .append(0, print, 'hello')
            .append(1000, print, 'world')
            .start()

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
                key: 'rexTCRP',
                plugin: TCRPPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);