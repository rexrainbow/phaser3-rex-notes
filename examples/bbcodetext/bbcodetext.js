'use strict'
import BBCodeText from './../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var s1 = '[color=blue]AA[/color]\n[i][color=red]B\nB[/color][b]CC[/b][/i]DDDDDDDD';
        var text = this.add.rexBBCodeText(100, 100, s1, {
            backgroundColor: '#555',
            fontSize: '60px',
            align: 'right',
            wrap: {
                mode: 'char',
                width: 200
            }
        });
        console.log(text.getWrappedText());
        console.log(text.getRawText());
        console.log(text.getText(undefined, 1, 4));

        var s2 = 'AA\nB\n\BCCDDDDDDDD'
        this.add.text(100, 400, s2, {
            backgroundColor: '#555',
            fontSize: '60px',
            align: 'right',
            wordWrap: {
                width: 200
            }
        });
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