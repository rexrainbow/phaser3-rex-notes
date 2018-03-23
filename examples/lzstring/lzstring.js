'use strict'

import LZStringPlugin from './../../plugins/lzstring-plugin.js';
const GetRandomElement = Phaser.Utils.Array.GetRandomElement;

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

      
        var lzstring = new LZStringPlugin(this, {
            //encoding: 'uri'      // 0|'none'|1|'base64'|2|'utf16'|3|'uri'
        });
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
    scene: Demo
};

var game = new Phaser.Game(config);