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
        var s = '[color=blue]AA[/color]\n[i][color=red]B\nB[/color][b]CC[/b][/i]DDDDDDDD';
        var text = this.add.rexBBCodeText(100, 100, s, {
            backgroundColor: '#555',
            fontSize: '60px',
            align: 'right',
            wrap: {
                mode: 'char',
                width: 200
            }
        });
        console.log(text.getRawText());
        console.log(text.getSubText(1, 4));
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