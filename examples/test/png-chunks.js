import phaser from 'phaser/src/phaser.js';
import GetChunks from '../../plugins/utils/pngchunks/GetChunks.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('image', '/assets/images/png-chunks/chunks.png');
        this.load.binary('image', '/assets/images/png-chunks/chunks.png', Uint8Array);
    }

    create() {
        var buf = this.cache.binary.get('image');
        var chunks = GetChunks(buf);
        for (var i = 0, cnt = chunks.length; i < cnt; i++) {
            var chunk = chunks[i];
            console.log(chunk.chunkType);
        }

        this.add.image(400, 300, 'image')
    }

    update() { }
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
    scene: Demo
};

var game = new Phaser.Game(config);