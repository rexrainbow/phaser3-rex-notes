import phaser from 'phaser/src/phaser.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('bolt', 'assets/images/bolt.png');
    }

    create() {
        var s1 = `\
[img=bolt]Line0
Line1
Line2\
    `;
        var text = this.add.rexBBCodeText(100, 30, s1, {
            backgroundColor: '#555',
            fontSize: 20,
            padding: { left: 0, right: 0, top: 20, bottom: 0 },
            images: {
                bolt: { y: -18 }
            }
        })
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