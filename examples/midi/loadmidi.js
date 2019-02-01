import midiParser from '../../plugins/utils/midi-parser/midi-parser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.music;
    }

    preload() {
        this.load.binary('mid', 'assets/audio/twinkle_twinkle.mid');
    }

    create() {
        var cache = this.cache.binary;
        var data = cache.get('mid');
        debugger        
        var midiJson = midiParser.parse(new Uint8Array(data));
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
    scene: Demo
};

var game = new Phaser.Game(config);