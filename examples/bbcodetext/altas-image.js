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
        var s = `\
AA[img=iconA][img=iconB]BB
CC[img=iconC][img=iconD]DD\
`
        var text = this.add.rexBBCodeText(100, 30, s, {
            backgroundColor: '#555',
            fontSize: 20,
            padding: { left: 0, right: 0, top: 0, bottom: 0 },
            images: {
                iconA: {
                    key: 'icons',
                    frame: 'add',
                    width: 20,
                    y: -1
                },
                iconB: {
                    key: 'icons',
                    frame: 'arrow-down',
                    width: 20,
                    y: -1
                },
                iconC: {
                    key: 'icons',
                    frame: 'close',
                    width: 20,
                    y: -1
                },
                iconD: {
                    key: 'icons',
                    frame: 'info',
                    width: 20,
                    y: -1
                },

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