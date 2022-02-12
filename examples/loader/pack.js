import phaser from 'phaser/src/phaser.js';

var data = {
    test1: {
        files: [
            {
                type: 'image',
                key: 'bolt',
                url: 'assets/images/bolt.png'
            },
            {
                type: 'image',
                key: 'key',
                url: 'assets/images/key.png'
            },
        ]
    }
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        // this.load.pack('pack', data);        
        this.load.pack('pack', data, 'test1');
        // this.load.pack('pack', 'assets/pack/pack.json', 'test1');
    }

    create() {
        this.add.image(400, 300, 'bolt')
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