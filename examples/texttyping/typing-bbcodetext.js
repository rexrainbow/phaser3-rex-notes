import phaser from 'phaser/src/phaser.js';
import TextTypingPlugin from '../../plugins/texttyping-plugin.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('key', 'assets/images/key.png');
    }

    create() {
        var txt = this.add.rexBBCodeText(100, 100, 'Touch to start typing', { fontSize: 30 });
        txt.typing = this.plugins.get('rexTextTyping').add(txt, {
            speed: 0.1 * 1000,
            //typeMode: 'middle-to-sides',
            //setTextCallback: myTypingFn
        });

        this.input.on('pointerdown', function () {
            txt.typing.start('[img=key] Find the [img=key], open the door. [img=key]');
        }, this);

        txt.typing.on('type', function () {
            console.log(txt.text);
        }, txt);


    }

    update() { }
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
        global: [
            {
                key: 'rexTextTyping',
                plugin: TextTypingPlugin,
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