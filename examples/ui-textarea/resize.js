import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
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
        var UseBBCodeTextGameObject = true;
        var textArea = this.rexUI.add.textArea({
            x: 400,
            y: 300,
            width: 220,
            height: 260,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_MAIN),

            text: (UseBBCodeTextGameObject) ? this.rexUI.add.BBCodeText(0, 0, '', {
                fixedLineHeightMode: false
            }) : this.add.text(),
            // textMask: false,

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
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

            content: CreateContent(100, UseBBCodeTextGameObject),
        })
            .layout()

        this.input.once('pointerdown', function () {
            textArea.setMinHeight(400).layout();
        })
    }

    update() { }
}

var CreateContent = function (linesCount, useBBCodeTextGameObject) {
    var numbers = [];
    for (var i = 0; i < linesCount; i++) {
        var line;
        if (useBBCodeTextGameObject) {
            if (i % 2) {
                line = `[color=green][size=40]${i}[/size][/color]`;
            } else {
                line = `[color=yellow]${i}[/color]`;
            }
        } else {
            line = i.toString();
        }
        numbers.push(line)
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