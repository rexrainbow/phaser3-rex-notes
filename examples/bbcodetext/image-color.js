import phaser from 'phaser/src/phaser.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('key', 'assets/images/key.png');
        this.load.image('bolt', 'assets/images/bolt.png');
    }

    create() {
        var s1 = `[color=red]AA[img=bolt][color=yellow][img=bolt]BB[/color]
[color=red]AA[img=key][color=yellow][img=key]BB[/color]`;
        var text = this.add.rexBBCodeText(100, 30, s1, {
            backgroundColor: '#555',
            fontSize: 40,
            images: {
                bolt: { y: -3 },
                key: { y: -3, tintFill: true },
            }

        });
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