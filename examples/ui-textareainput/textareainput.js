import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var textArea = this.rexUI.add.textAreaInput({
            x: 400,
            y: 300,
            width: 220,
            height: 260,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY),

            text: {
                background: {
                    stroke: 'white',

                    'focus.stroke': 'red',
                },

                style: {
                    fontSize: 20,
                    backgroundBottomY: 1,
                    backgroundHeight: 20,

                    'cursor.color': 'black',
                    'cursor.backgroundColor': 'white',
                },
            },

            slider: {
                track: { width: 20, radius: 10, color: COLOR_DARK },
                thumb: { radius: 13, color: COLOR_LIGHT },
            },

            space: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,

                text: 10,
                header: 0,
                footer: 0,
            },

            mouseWheelScroller: {
                focus: false,
                speed: 0.1
            },

            header: this.rexUI.add.label({
                height: 30,

                orientation: 0,
                background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                text: this.add.text(0, 0, 'Header'),
            }),

            footer: this.rexUI.add.label({
                height: 30,

                orientation: 0,
                background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                text: this.add.text(0, 0, 'Footer'),
            }),

            content: content,
        })
            .layout()

            .on('textchange', function (text) {
                console.log(`Content: '${text}'`)
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);