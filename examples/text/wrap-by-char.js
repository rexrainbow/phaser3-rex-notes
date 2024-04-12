import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var textObject = this.add.text(200, 200, '一二三四五六七八九零一二三四五六七八九零一二三四五六七八九零一二三四五六七八九零', {
            backgroundColor: 'grey',
            testString: '|MÉqgy回',
            fixedWidth: 200,
            wordWrap: {
                width: 200,
                callback: function (text, textObject) {
                    var context = textObject.context;
                    var wrapWidth = textObject.style.wordWrapWidth;

                    // Short string testing
                    if (text.length <= 100) {
                        var textWidth = context.measureText(text).width;
                        if (textWidth <= wrapWidth) {
                            return text;
                        }
                    }

                    var lines = [];
                    var line = [], remainderLineWidth = wrapWidth;
                    var tokenArray = text.split('');
                    var token, tokenWidth;
                    for (var j = 0, tokenLen = tokenArray.length; j < tokenLen; j++) {
                        token = tokenArray[j];
                        tokenWidth = context.measureText(token).width;

                        remainderLineWidth -= tokenWidth;
                        if (remainderLineWidth < 0) {
                            lines.push(line.join(''));
                            line.length = 0;
                            remainderLineWidth = wrapWidth - tokenWidth;
                        }

                        line.push(token);
                    }

                    if (line.length > 0) {
                        lines.push(line.join(''));
                    }

                    return lines;
                }
            }
        });
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
    scene: Demo
};

var game = new Phaser.Game(config);