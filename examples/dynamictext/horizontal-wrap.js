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
                width: 400, height: 200,  // Set width and height

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

        var content = 'Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.'
        text.appendText(content)

        this.print = this.add.text(0, 580, '');

        ShowNextPage(text, {
            maxLines: 5,         // Show 5 lines per page
            padding: {
                left: 20,
                right: 20,
                top: -20,
                bottom: 10
            },
        })

    }

    update() { }
}

var ShowNextPage = function (text, config) {
    var result = text.runWordWrap(config);

    var scene = text.scene;
    if (!result.isLastPage) {
        scene.print.setText('Click to continue');
        scene.input.once('pointerdown', function () {
            scene.print.setText('');
            ShowNextPage(text, result);
        })
    } else {
        scene.print.setText('Last page');
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
            key: 'rexDynamicText',
            plugin: DynamicTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);