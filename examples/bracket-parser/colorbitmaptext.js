import BracketParserPlugin from '../../plugins/bracketparser-plugin.js';

class ColorBitmapText extends Phaser.GameObjects.BitmapText {
    constructor(scene, x, y, key, text, size, align) {
        super(scene, x, y, key, text, size, align);
        scene.add.existing(this);
    }

    setText(text) {
        this.charColors.length = 0;

        var colorFlag = null;
        var parser = this.scene.plugins.get('rexBracketParserPlugin').add({
            brackets: '[]'
        })
            .on('+color', function (color) {
                colorFlag = parseInt(color, 16);
            }, this)
            .on('-color', function () {
                colorFlag = null;
            }, this)
            .on('content', function (content) {
                var startIndex = this.text.length;
                this.appendText(content);
                if (colorFlag !== null) {
                    this.setCharacterTint(startIndex, content.length, true, colorFlag);
                }
            }, this)
            .start(text);
    }

    appendText(text) {
        super.setText(this.text + text);
        return this;
    }
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('knighthawks', 'assets/fonts/knighthawks-font-filled.png');
    }

    create() {

        var config = {
            image: 'knighthawks',
            width: 31,
            height: 24,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET2,
            charsPerRow: 10,
            spacing: {
                x: 1,
                y: 1
            }
        };
        this.cache.bitmapFont.add('knighthawks', Phaser.GameObjects.RetroFont.Parse(this, config));

        var s = '[color=ff0000]HEL[color=00ff00]LO WOR[color=0000ff]LD [/color]PHASER';
        var txt = new ColorBitmapText(this, 100, 100, 'knighthawks', s);
    }

    update(time) {
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