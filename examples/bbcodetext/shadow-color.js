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
        var s = `\
[shadow]AAA[/shadow]
[shadow=red]BBB[/shadow]
[shadow=green]CCC[/shadow]\
`
        this.add.rexBBCodeText(400, 300, s, {
            fontSize: 36,
            backgroundColor: '#333333',
            shadow: {
                offsetX: 3,
                offsetY: 3,
                color: 'yellow',  // css string, or number
                blur: 5,
                stroke: true,
                fill: true
            },

            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
            }
        })
            .setOrigin(0.5)

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
        global: [{
            key: 'BBCodeTextPlugin',
            plugin: BBCodeTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);