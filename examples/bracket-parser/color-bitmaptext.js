import 'phaser';
import BracketParserPlugin from '../../plugins/bracketparser-plugin.js';

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

        var txt = this.add.bitmapText(100, 100, 'gothic');
        var s = '[color=#ff0000]Hel[color=#00ff00]lo Wor[color=#0000ff]ld [/color]Phaser';
        SetColorText(txt, s);
    }

    update(time) {
    }
}

var SetColorText = function (bitmapText, text) {
    var plainText = '';
    var colorMarks = [];

    var colorFlag = null;
    var parser = bitmapText.scene.plugins.get('rexBracketParserPlugin').add({
        delimiters: '[]'
    })
        .on('+color', function (color) {
            if (typeof (color) === 'string') {
                color = parseInt(color.replace(/#|0x/, ''), 16);
            }
            colorFlag = color;
        })
        .on('-color', function () {
            colorFlag = null;
        })
        .on('content', function (content) {
            var startIndex = plainText.length;
            plainText += content;
            if (colorFlag !== null) {
                colorMarks.push([startIndex, content.length, true, colorFlag]);
            } else {
                colorMarks.push([startIndex, content.length, false, 0xffffff])
            }
        })
        .start(text);

    bitmapText.setText(plainText);
    for (var i = 0, cnt = colorMarks.length; i < cnt; i++) {
        bitmapText.setCharacterTint.apply(bitmapText, colorMarks[i]);
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
            key: 'rexBracketParserPlugin',
            plugin: BracketParserPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);