import 'phaser';
import HiddenInputTextPlugin from '../../plugins/hiddeninputtext-plugin.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var textObject = this.add.rexBBCodeText(300, 200, '', {
            fixedWidth: 300,
            fixedHeight: 200,
            backgroundColor: '#222222',
            halign: 'center',
            valign: 'center'
        })

        var hiddenInputText = this.add.rexHiddenInputText(textObject, {
            type: 'textarea',
            updateTextCallback: function (text, hiddenInputText) {
                if (hiddenInputText.isFocused) {
                    var curosrChar = '[color=blue][size=12][b][y=-2]|[/y][/b][/size][/color]';
                    var cursorPosition = hiddenInputText.cursorPosition;
                    return text.substring(0, cursorPosition) + curosrChar + text.substring(cursorPosition);
                } else {
                    return text;
                }
            }
        })
            .on('focus', function (hiddenInputText) {
                hiddenInputText.textObject.setBackgroundColor('#555555')
            })
            .on('blur', function () {
                hiddenInputText.textObject.setBackgroundColor('#222222')
            })
    }

    update() {

    }
}

var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    dom: {
        createContainer: true
    },
    scene: Demo,
    plugins: {
        global: [
            {
                key: 'rexHiddenInputText',
                plugin: HiddenInputTextPlugin,
                start: true
            },
            {
                key: 'BBCodeTextPlugin',
                plugin: BBCodeTextPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);