'use strict'
import BBCodeText from './../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var s = '[color=blue]AA[/color]\n[i][color=red]B\nB[/color][b]CC[/b][/i]DD';
        this.add.rexBBCodeText(100, 100, s, {
            backgroundColor: '#555',
            fontSize: '60px',
            halign: 'right',
            valign: 'center',
            maxLines: 1
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