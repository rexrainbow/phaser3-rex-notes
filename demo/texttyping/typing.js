'use strict'

import TextTypingPlugin from './../../plugins/texttyping-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'demo'
        })
    }

    preload() {}

    create() {
        var txt = this.add.text(100, 100, 'Touch to start typing');
        txt.typing = new TextTypingPlugin(txt, {
            speed: 0.3 * 1000,
            //typeMode: 'middle-to-sides',
            //setTextCallback: myTypingFn
        });

        this.input.on('pointerdown', function () {
            txt.typing.start('ABCDEFG');
        }, this);

        txt.typing.on('typing', function () {
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
    scene: Demo
};

var game = new Phaser.Game(config);