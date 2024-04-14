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
        var content = `\
一二三四五六七八九零一二三四五六七八九零一二三四五六七八九零一二三四五六七八九零
一二三四五六七八九零一二三四五六七八 hello world\
`
        var textObject = this.add.text(200, 150, content, {
            backgroundColor: 'grey',
            fontSize: 26,
            testString: '|MÉqgy回',
            fixedWidth: 200,
            wordWrap: {
                width: 200,
                callback: TextWrapByCharCallback
            }
        });
    }

    update() {

    }
}

var TextWrapByCharCallback = function (text, textObject) {
    var output = [];

    var textLines = text.split('\n');
    var style = textObject.style;
    var wrapWidth = style.wordWrapWidth;
    var context = textObject.context;
    for (var i = 0, cnt = textLines.length; i < cnt; i++) {
        WrapLine(context, textLines[i], wrapWidth, output);
    }

    return output;
}

var RE_ASCII = /^[\x00-\x7F]+$/;
var IsASCIIString = function (s) {
    return RE_ASCII.test(s);
}

var GetTokenArray = function (text) {
    var tokenArray = [];
    var words = text.split(' '), word;
    for (var i = 0, wordCount = words.length; i < wordCount; i++) {
        word = words[i];

        if (i < (wordCount - 1)) {
            if (IsASCIIString(word)) {
                tokenArray.push(word + ' ');
            } else {
                tokenArray.push(...word.split(''));
                // Add space as last token
                tokenArray.push(' ');
            }

        } else {  // The last word
            if (word !== '') {
                if (IsASCIIString(word)) {
                    tokenArray.push(word);
                } else {
                    tokenArray.push(...word.split(''));
                }
            }

        }

    }

    return tokenArray;
}

var WrapLine = function (context, text, wrapWidth, output) {
    if (text.length <= 100) {
        var textWidth = context.measureText(text).width;
        if (textWidth <= wrapWidth) {
            output.push(text);
            return output;
        }
    }

    var tokenArray = GetTokenArray(text);

    var token, tokenWidth;
    var line = [], remainderLineWidth = wrapWidth;
    for (var j = 0, tokenLen = tokenArray.length; j < tokenLen; j++) {
        token = tokenArray[j];
        tokenWidth = context.measureText(token).width;

        remainderLineWidth -= tokenWidth;
        if (remainderLineWidth < 0) {
            output.push(line.join(''));
            line.length = 0;
            remainderLineWidth = wrapWidth - tokenWidth;
        }

        line.push(token);
    }

    if (line.length > 0) {
        output.push(line.join(''));
    }

    return output;
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