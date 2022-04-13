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
        var text = this.add.rexDynamicText(
            {
                x: 400, y: 300,
                width: 300,
                height: 300,

                background: {
                    stroke: 'white',
                    cornerRadius: 20
                },
                innerBounds: {
                    stroke: '#A52A2A'
                },
                padding: 20,
                style: {
                    fontSize: '16px',
                },
            }
        )

        var content = [
            'LeftLeftLeftLeftLeftLeftLeft\n',
            'CenterCenterCenterCenter\n',
            'abc\n',
        ];
        text
            .appendText(content[0], { color: '#FFF8DC', align: 'left' })
            .appendText(content[1], { color: '#008B8B', align: 'center' })
            .appendText(content[2], { color: '#FF7F50', align: 'right' })

        text.runWordWrap({
            lineHeight: 30,
            letterSpacing: 4,
            maxLines: 0,       // Set maxLines to 0
            padding: { bottom: 10 },
            charWrap: true,

            vAlign: 'bottom'
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