import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        var key = 'card';
        this.load.binary('card', 'assets/images/card2.png', Uint8Array);
        this.load.once(`filecomplete-binary-${key}`, function () {
            var buffer = this.cache.binary.get(key);

            var blob = new Blob([buffer], { type: 'image/png' });
            var url = window.URL.createObjectURL(blob);
            this.load.image(key, url);
        }, this);
    }

    create() {
        this.add.image(400, 300, 'card').setScale(0.3);
    }

    update() {

    }
}

var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    scene: Demo,
};

var game = new Phaser.Game(config);