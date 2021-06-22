import 'phaser';
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
                width: 400,
                height: 500,

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
            'Phaser is a fast, free, and fun open source HTML5 game framework\n',
            'that offers WebGL and DynamicText rendering across desktop and mobile web browsers.\n',
            'Games can be compiled to iOS, Android and native apps by using 3rd party tools.\n',
            'You can use JavaScript or TypeScript for development.'
        ];
        text
            .appendText(content[0], { color: '#FFF8DC' })
            .appendText(content[1], { color: '#008B8B' })
            .appendText(content[2], { color: '#FF7F50' })
            .appendText(content[3], { color: '#F8F8FF' });

        var result = text.runWordWrap({
            lineHeight: 30,
            letterSpacing: 4,
            maxLines: 0,       // Set maxLines to 0
            padding: { bottom: 10 },

            hAlign: 'right',
            vAlign: 'bottom'
        });

        var drawUnderline = function () {
            var text = this.text;
            if ((text === ' ') || (text === '\n')) {
                return;
            }

            var context = this.context;

            var savedLineCap = context.lineCap;
            context.lineCap = 'butt';

            context.strokeStyle = '#FA8072';
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(this.width, 0);
            context.stroke();

            context.lineCap = savedLineCap;
        }

        var children = result.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            children[i]
                .setAngle(Math.random() * 30 - 15)
                .modifyStyle({ fontSize: Phaser.Math.Between(16, 24) })
                .setDrawBelowCallback(drawUnderline)
        }
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