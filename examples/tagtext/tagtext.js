import 'phaser';
import TagTextPlugin from '../../plugins/tagtext-plugin.js';

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
        var tags = {
            cap: {
                color: 'red',
                fontStyle: 'bold italic'
            },
            superscript: {
                y: -16,
                size: 20
            },
            marker: {
                underline: {
                    color: 'blue',
                    thinkness: 20,
                }
            },
            tail: {
                color: 'none',
                stroke: {
                    color: 'yellow',
                    thinkness: 1
                }
            },
            key: {
                img: 'key'
            }
        };
        var s1 = `<class='cap'>H</class><class='marker'>ell</class><class='tail'>o</class>
<style='color:red;size:30px'>W</style><style='size:40px'>o</style><style='size:50px'>r</style><style='u:green 30px'>ld</style>
<style='color:white;size:30px'>Th</style><style='y:4;size:20px'>is</style> <class='superscript'>is</class> a <class='key'></class>`;
        var text = this.add.rexTagText(100, 100, s1, {
            backgroundColor: '#555',
            fontSize: '60px',
            align: 'right',
            wrap: {
                mode: 'char',
                width: 200
            },

            tags: tags
        });
        console.log(text.getWrappedText());
        console.log(text.getPlainText());
        console.log(text.getText(undefined, 1, 4));


        this.input.once('pointerdown', function () {
            // Change size of image
            text.addImage('key', {
                key: 'key',
                width: 64,
            })

            text.updateText()
        })
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
        global: [{
            key: 'TagTextPlugin',
            plugin: TagTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);