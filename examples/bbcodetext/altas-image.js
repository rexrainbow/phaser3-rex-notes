import Phaser from 'phaser';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.atlas('icons', 'assets/images/icons/icons.png', 'assets/images/icons/icons.json');
    }

    create() {
        var text = this.add.rexBBCodeText(100, 30, `AB[img=close]CD`, {
            backgroundColor: '#555',
            fontSize: 20,
            padding: { left: 0, right: 0, top: 20, bottom: 0 },
            images: {
                close: {
                    key: 'icons',
                    frame: 'close',
                    y:-12
                }
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