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

    preload() {
        this.load.bitmapFont('gothic', 'assets/fonts/gothic.png', 'assets/fonts/gothic.xml');
    }

    create() {
        var lineHeight = 75
        var textArea = this.rexUI.add.textArea({
            x: 400,
            y: 300,
            width: 220,
            height: lineHeight*6,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_MAIN),

            text: this.add.bitmapText(0, 0, 'gothic'),
            // textMask: false,

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),

                tickLength: lineHeight
            },

            content: CreateContent(1000),
        })
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000);

    }

    update() { }
}

var CreateContent = function (linesCount) {
    var numbers = [];
    for (var i = 0; i < linesCount; i++) {
        numbers.push(i.toString());
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