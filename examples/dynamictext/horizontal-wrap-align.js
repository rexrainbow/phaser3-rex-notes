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
        var content = 'Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers.'
        this.add.rexDynamicText(
            {
                x: 200, y: 100,
                width: 350,

                background: { color: 'gray', },
                style: { fontSize: '20px', },

                text: content
            }
        )
            .runWordWrap({
                wrapMode: 'word',
                hAlign: 'left'
            });

        this.add.rexDynamicText(
            {
                x: 200, y: 250,
                width: 350,

                background: { color: 'gray', },
                style: { fontSize: '20px', },

                text: content
            }
        )
            .runWordWrap({
                wrapMode: 'word',
                hAlign: 'center'
            });

        this.add.rexDynamicText(
            {
                x: 200, y: 400,
                width: 350,

                background: { color: 'gray', },
                style: { fontSize: '20px', },

                text: content
            }
        )
            .runWordWrap({
                wrapMode: 'word',
                hAlign: 'right'
            });

        this.add.rexDynamicText(
            {
                x: 600, y: 100,
                width: 350,

                background: { color: 'gray', },
                style: { fontSize: '20px', },

                text: content
            }
        )
            .runWordWrap({
                wrapMode: 'word',
                hAlign: 'justify'
            });

        this.add.rexDynamicText(
            {
                x: 600, y: 250,
                width: 350,

                background: { color: 'gray', },
                style: { fontSize: '20px', },

                text: content
            }
        )
            .runWordWrap({
                wrapMode: 'word',
                hAlign: 'justify-center'
            });

        this.add.rexDynamicText(
            {
                x: 600, y: 400,
                width: 350,

                background: { color: 'gray', },
                style: { fontSize: '20px', },

                text: content
            }
        )
            .runWordWrap({
                wrapMode: 'word',
                hAlign: 'justify-right'
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