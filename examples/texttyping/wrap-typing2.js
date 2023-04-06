import phaser from 'phaser/src/phaser.js';
import TextTypingPlugin from '../../plugins/texttyping-plugin.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var content = 'AAAA AAAA AAAA';
        var wrapWidth = 130;
        var txt = this.add.rexBBCodeText(100, 100, '')
            .setBackgroundColor('gray')
            .setFixedSize(wrapWidth, 0)
            .setWrapMode('word')
            .setWordWrapWidth(wrapWidth)
            .setText(content)
            .updateText(true)

        console.log(txt.width)

        txt.typing = this.plugins.get('rexTextTyping').add(txt, {
            speed: 100,
        });

        txt.typing.start(txt.text);

    }

    update() { }
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