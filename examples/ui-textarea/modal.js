import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var dialog = CreateDialog(this, CreateContent(10000))
            .layout()
            .modalPromise()
            .then(function () {
                console.log('Close dialog')
            })
    }

    update() { }
}

var CreateDialog = function (scene, content) {
    return scene.rexUI.add.textArea({
        x: 400,
        y: 300,
        width: 300,
        height: 400,

        background: scene.rexUI.add.roundRectangle({
            color: COLOR_PRIMARY,
            radius: 20
        }),

        // text: scene.add.text(),
        text: scene.rexUI.add.BBCodeText(),
        // textMask: true,

        slider: {
            track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
            thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
        },

        space: {
            left: 20, right: 20, top: 20, bottom: 20,

            text: 10,
            // text: {
            //     top: 20,
            //     bottom: 20,
            //     left: 20,
            //     right: 20,
            // },
            header: 20,
            footer: 20,
        },

        scroller: {
            // pointerOutRelease: false,
        },

        mouseWheelScroller: {
            focus: false,
            speed: 0.1
        },

        header: scene.rexUI.add.label({
            space: { left: 10, right: 10, top: 10, bottom: 10 },

            orientation: 0,
            background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
            text: scene.add.text(0, 0, 'Title'),
        }),

        footer: scene.rexUI.add.label({
            space: { left: 10, right: 10, top: 10, bottom: 10 },

            orientation: 0,
            background: scene.rexUI.add.roundRectangle({
                radius: 10,
                color: COLOR_DARK,
                strokeColor: COLOR_LIGHT
            }),
            text: scene.add.text(0, 0, 'Close'),
        }).onClick(function (button, gameObject, pointer, event) {
            gameObject.getTopmostSizer().modalClose();
        }),

        content: content,

        expand: {
            footer: false
        }
    })
}

var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;
var CreateContent = function (linesCount) {
    var numbers = [];
    for (var i = 0; i < linesCount; i++) {
        numbers.push('[color=' + ((i % 2) ? 'green' : 'yellow') + ']' + i.toString() + '[/color]');
    }
    return content + '\n' + numbers.join('\n');
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