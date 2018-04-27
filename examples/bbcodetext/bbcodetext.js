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
        var s = "[color=blue]AA[/color][i][color=red]BB[/color][b]CC[/b][/i]DD";
        this.add.rexBBCodeText(100, 100, s, {
            backgroundColor: '#555',
            fontSize: '60px',
            fixedWidth: 300,
            fixedHeight: 300
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