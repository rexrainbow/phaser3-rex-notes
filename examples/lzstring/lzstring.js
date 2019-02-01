import LZStringPlugin from '../../plugins/lzstring-plugin.js';

const GetRandom = Phaser.Utils.Array.GetRandom;

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
            src += GetRandom(chars);
        }

      
        var lzstring = this.plugins.get('rexLZString').add({
            // encoding: 'none'     // 'none'|0, 'base64'|1, 'utf16'|2, 'uri'|3
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
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
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