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
        var textArea = this.rexUI.add.textArea({
            x: 400,
            y: 300,
            width: 220,
            height: 260,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY),

            // text: this.add.text(),
            text: this.rexUI.add.BBCodeText(),
            // textMask: false,

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
                adaptThumbSize: true,
                minThumbSize: 26,

                buttons: {
                    top: this.rexUI.add.BBCodeText(0, 0, 'U', {
                        fixedWidth: 20, fixedHeight: 20,
                        halign: 'center', valign: 'center'
                    }),
                    bottom: this.rexUI.add.BBCodeText(0, 0, 'D', {
                        fixedWidth: 20, fixedHeight: 20,
                        halign: 'center', valign: 'center'
                    })
                }
            },

            space: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,

                text: 10,
                // text: {
                //     top: 20,
                //     bottom: 20,
                //     left: 20,
                //     right: 20,
                // },
                header: 0,
                footer: 0,
            },

            scroller: {
                // pointerOutRelease: false,
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

            content: CreateContent(30),
        })
            .layout()

        console.log(`Child visible height = ${textArea.childVisibleHeight}`);
        console.log(`Child height = ${textArea.childHeight}`);
    }

    update() { }
}

var CreateContent = function (linesCount) {
    var numbers = [];
    for (var i = 0; i < linesCount; i++) {
        numbers.push('[color=' + ((i % 2) ? 'green' : 'yellow') + ']' + i.toString() + '[/color]');
    }
    return numbers.join('\n');
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