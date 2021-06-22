import 'phaser';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var t1 = this.add.rexBBCodeText(100, 300, 'Hello how are you my dear friend?', {
            fixedWidth: 200,
            fixedHeight: 200,
            backgroundColor: '#333333',
            fontSize: '20px',
            wrap: {
                mode: 'word',
                width: 200,
            },
            maxLines: 5,
        })

        var t2 = this.add.rexBBCodeText(500, 300, 'Hello how are you my dear friend?', {
            fixedWidth: 200,
            fixedHeight: 200,
            backgroundColor: '#333333',
            fontSize: '40px',
            wrap: {
                mode: 'word',
                width: 200,
            },
            maxLines: 5,
        })

        this.time.delayedCall(1500, function () {
            t1.setText('Hello how are you my dear friend? SET VIA SETTEXT')
        });
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