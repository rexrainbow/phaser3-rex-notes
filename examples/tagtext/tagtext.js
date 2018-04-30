'use strict'
import TagText from './../../plugins/tagtext-plugin.js';

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
        var s1 = `<class='cap'>H</class><class='marker'>ell</class><class='tail'>o</class>
<style='color:red;size:30px'>W</style><style='size:40px'>o</style><style='size:50px'>r</style><style='u:green 30px -10px'>ld</style>`;
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
        console.log(text.getRawText());
        console.log(text.getText(undefined, 1, 4));

    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);