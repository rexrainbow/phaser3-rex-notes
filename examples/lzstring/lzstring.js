'use strict'

import LZStringPlugin from './../../plugins/lzstring-plugin.js';

const GetRandomElement = Phaser.Utils.Array.GetRandom;

class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        
    }

    create() {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ';
        var src = '';
        for (var i=0; i<10000; i++) {
            src += GetRandomElement(chars);
        }

      
        var lzstring = this.plugins.get('rexLZString');
        //lzstring.setEncoding('uri');  // 'none', 'base64', 'utf16', 'uri'
        var compressResult = lzstring.compress(src);
        var decompressResult = lzstring.decompress(compressResult);

        if (decompressResult === src) {
            console.log('pass, ' + 
                        src.length + " --> " + compressResult.length + 
                        " : " + (compressResult.length/src.length));
        } else {
            console.log('fail');
        }

        //console.log(src);
        //console.log(compressResult);
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexLZString',
            plugin: LZStringPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);