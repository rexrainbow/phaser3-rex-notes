'use strict'

import XOR from './../../plugins/xor-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.txt;
    }

    preload() {}

    create() {
        var src = 'Hello world';
        console.log('Source: ' + src);
        var pwd = 'aabbcc';
        var encResult = XOR.Encrypt(src, pwd);
        console.log('Encrypt result: ' + encResult);
        var decResult = XOR.Decrypt(encResult, pwd);
        console.log('Decrypt result: ' + decResult);

        console.log((decResult === src)? 'pass' : 'fail');
    }

    update() {
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);