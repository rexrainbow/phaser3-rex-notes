import phaser from 'phaser/src/phaser.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var txt1 = this.add.rexBBCodeText(
            200, 350,
            '[shadow][u]Hello world[/u][/shadow]\n[u]Hello world[/u]',
            {
                padding: { left: 5, right: 15, top: 5, bottom: 5 },
                fontSize: 40,
                backgroundColor: 'cyan',

                shadow: {
                    offsetX: 5,
                    offsetY: 5,
                    blur: 2,
                    color: 'black'
                },

                underline: {
                    color: 'white',
                    thickness: 2,
                    offset: 1
                },
            }
        )

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
            key: 'BBCodeTextPlugin',
            plugin: BBCodeTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);