import phaser from 'phaser/src/phaser.js';
import DynamicTextPlugin from '../../plugins/dynamictext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var s = '你好世界 你好世界 你好世界 Hello world Hello world Hello world';

        this.add.rexDynamicText(
            {
                x: 200, y: 200,
                width: 180,

                background: { color: '#555', },
                style: { fontSize: '20px', },

                text: s
            }
        )
            .runWordWrap({
                wrapMode: 'word'
            });


        this.add.rexDynamicText(
            {
                x: 400, y: 200,
                width: 180,

                background: { color: '#555', },
                style: { fontSize: '20px', },

                text: s
            }
        )
            .runWordWrap({
                wrapMode: 'char'
            });


        this.add.rexDynamicText(
            {
                x: 600, y: 200,
                width: 180,

                background: { color: '#555', },
                style: { fontSize: '20px', },

                text: s
            }
        )
            .runWordWrap({
                wrapMode: 'mix'
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
            key: 'rexDynamicText',
            plugin: DynamicTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);