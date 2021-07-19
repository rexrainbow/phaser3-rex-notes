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
        var s = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        var txt0 = this.add.rexBBCodeText(100, 30, s, {
            fontSize: '60px',
            wrap: {
                mode: 'char',
                width: 200
            },
        })

        var txt1 = this.add.rexBBCodeText(400, 30, s, {
            wrap: {
                mode: 'char',
                width: 200
            },
        })

        txt1.setTextMetrics(
            txt0.getTextMetrics(),
            { fontSize: txt0.style.fontSize }
        )
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