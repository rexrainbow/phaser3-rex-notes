import TextTypingPlugin from '../../plugins/texttyping-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {                
        var txt = this.add.text(100, 100, 'Touch to start typing');
        txt.typing = this.plugins.get('rexTextTyping').add(txt, {
            speed: 0.3 * 1000,
            //typeMode: 'middle-to-sides',
            //setTextCallback: myTypingFn
        });

        this.input.on('pointerdown', function () {
            txt.typing.start('ABCDEFG');
        }, this);

        txt.typing.on('type', function () {
            console.log(txt.text);
        }, txt);


    }

    update() {}
}

String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};
var myTypingFn = function (text, isLastChar, insertIdx) {
    if (!isLastChar) {
        text = text.splice(insertIdx, 0, '|');
    }
    return text;
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
            key: 'rexTextTyping',
            plugin: TextTypingPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);