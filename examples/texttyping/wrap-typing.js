import 'phaser';
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
        // var txt = this.add.text(100, 100, 'Touch to start typing', {
        //     backgroundColor: '#333333',
        //     fixedWidth: 300,
        //     fixedHeight: 300,
        //     wordWrap: {
        //         width: 300,
        //     },
        // });

        var txt = this.add.rexBBCodeText(100, 100, 'Touch to start typing', {
            backgroundColor: '#333333',
            fixedWidth: 300,
            fixedHeight: 300,
            wrap: {
                width: 300,
            },
        });

        txt.typing = this.plugins.get('rexTextTyping').add(txt, {
            wrap: true,
            speed: 0.1 * 1000,
        });

        var content = `\
AAAAAAA AAAAAAA AAAAAAA AAAAAAA AAAAAAA BBBBBBB BBBBBBB BBBBBBB
CCCCCCC CCCCCCC CCCCCCC CCCCCCC CCCCCCC CCCCCCC CCCCCCC CCCCCCC\
`;
        this.input.on('pointerdown', function () {
            txt.typing.start(content);
        }, this);

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