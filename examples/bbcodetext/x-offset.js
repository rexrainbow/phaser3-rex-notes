import 'phaser';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var txt0 = this.add.rexBBCodeText(400, 280, 'ˊ', {
            backgroundColor: '#333333',
            fontSize: 72,
            testString: 'ˊ'
        })

        var txt1 = this.add.rexBBCodeText(400, 300, 'ˊ', {
            backgroundColor: '#333333',
            fontSize: 72,
            testString: 'ˊ'
        })

        txt1.setXOffset(-txt1.measureTextMargins('ˊ').left);
    }

}

var config = {
    type: Phaser.AUTO,
    parent: 'main',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
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