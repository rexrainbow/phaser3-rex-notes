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
        var scrollablePanel = this.rexUI.add.scrollablePanel({
            x: 400,
            y: 300,
            width: 250,
            height: 220,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_PRIMARY),

            panel: {
                child: this.rexUI.add.fixWidthSizer(),

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

        updatePanel(scrollablePanel);
    }

    update() { }
}

var updatePanel = function (panel) {
    var sizer = panel.getElement('panel');
    var scene = panel.scene;


    sizer.add(scene.rexUI.add.simpleLabel({ text: { fontSize: 24 } }).resetDisplayContent('Nickname'))
    sizer.addNewLine()
    sizer.add(scene.rexUI.add.simpleLabel({ text: { fontSize: 24 } }).resetDisplayContent('Nickname'))
    sizer.addNewLine()
    var inputText = scene.rexUI.add.inputText({
        width: 100, height: 24,
        text: 'HEllo',
        color: 0xffffff,
        fontSize: 24
    })

    sizer.add(inputText)
    sizer.addNewLine()
    sizer.add(scene.rexUI.add.simpleLabel({ text: { fontSize: 24 } }).resetDisplayContent('Nickname'))
    sizer.addNewLine()
    sizer.add(scene.rexUI.add.simpleLabel({ text: { fontSize: 24 } }).resetDisplayContent('Nickname'))
    sizer.addNewLine()

    panel
        .layout()
        .drawBounds(scene.add.graphics(), 0xff0000)

    return panel;
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
    dom: {
        createContainer: true
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