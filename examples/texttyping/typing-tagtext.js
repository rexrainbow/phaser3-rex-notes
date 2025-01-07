import phaser from 'phaser/src/phaser.js';
import TextTypingPlugin from '../../plugins/texttyping-plugin.js';
import TagTextPlugin from '../../plugins/tagtext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var txt = this.add.rexTagText(100, 100, 'Touch to start typing', {
            fontSize: 30,
            tags: {
                red: {
                    color: 'red'
                }
            }
        });
        txt.typing = this.plugins.get('rexTextTyping').add(txt, {
            speed: 0.1 * 1000,
            //typeMode: 'middle-to-sides',
        });

        this.input.on('pointerdown', function () {
            txt.typing.start('AA<class="red">BBBBBB</class>CCCCC');
        }, this);

        txt.typing.on('type', function () {
            console.log(txt.text);
        }, txt);
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
                key: 'TagTextPlugin',
                plugin: TagTextPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);