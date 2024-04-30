import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('nextPage', 'assets/images/arrow-down-left.png');
    }

    create() {
        var scrollablePanel = this.rexUI.add.scrollablePanel({
            x: 400,
            y: 300,
            width: 300,
            height: 100,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_MAIN),

            panel: {
                child: createTextBox(this),

                mask: {
                    padding: 1
                },
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                panel: 10,
            }
        })
            .layout()

        var textbox = scrollablePanel.getElement('panel');
        textbox
            .on('type', function () {
                scrollablePanel.scrollToBottom();
            })


        textbox.start(content, 30)


    }

    update() { }
}

var createTextBox = function (scene) {
    var textBox = scene.rexUI.add.textBox({
        text: scene.rexUI.add.BBCodeText(0, 0, '', {
            fontSize: '20px'
        }),
        expandTextWidth: true,
    })

    return textBox;
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);