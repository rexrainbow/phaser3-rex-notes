import TagTextPlugin from '../../plugins/tagtext-plugin.js';
import TextTypingPlugin from '../../plugins/texttyping-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var tags = {
            cap: {
                color: 'red',
                fontStyle: 'bold italic'
            },
            marker: {
                underline: {
                    color: 'blue',
                    thinkness: 20,
                    offset: -10
                }
            },
            tail: {
                color: 'none',
                stroke: {
                    color: 'yellow',
                    thinkness: 1
                }
            }
        };

        var txt = this.add.rexTagText(100, 100, 'Touch to start typing', {
            backgroundColor: '#555',
            fontSize: '60px',
            align: 'right',
            wrap: {
                mode: 'char',
                width: 200
            },

            tags: tags
        });
        txt.typing = new TextTypingPlugin(txt, {
            speed: 0.3 * 1000,
            //typeMode: 'middle-to-sides',
            //setTextCallback: myTypingFn
        });

        this.input.on('pointerdown', function () {
            var s1 = `<class='cap'>H</class><class='marker'>ell</class><class='tail'>o</class>`;
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
            key: 'TagTextPlugin',
            plugin: TagTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);