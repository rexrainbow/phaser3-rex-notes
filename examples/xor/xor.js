import XORPlugin from '../../plugins/xor-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var XOR = this.plugins.get('rexXOR');
        
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
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexXOR',
            plugin: XORPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);