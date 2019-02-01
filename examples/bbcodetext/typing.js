import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';
import TextTypingPlugin from '../../plugins/texttyping-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        this.textTyping = this.plugins.get('rexTextTyping');

        var txt = this.add.rexBBCodeText(100, 100, 'Touch to start typing', {
            backgroundColor: '#555',
            fontSize: '30px',
            // align: 'right',
            wrap: {
                mode: 'char',
                width: 200
            }
        });
        txt.typing = this.textTyping.add(txt, {
            speed: 0.3 * 1000,
            typeMode: 'right-to-left',
            //setTextCallback: myTypingFn
        });

        this.input.on('pointerdown', function () {
            var s1 = '[color=blue]AA[/color]\n[i][color=red]B\nB[/color][b]CC[/b][/i]DDDDDDDD';
            txt.typing.start(s1);
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
                key: 'BBCodeTextPlugin',
                plugin: BBCodeTextPlugin,
                start: true
            },
            {
                key: 'rexTextTyping',
                plugin: TextTypingPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);