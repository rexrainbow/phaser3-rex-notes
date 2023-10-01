import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        var key = 'classroom';
        this.load.binary(key, 'assets/images/backgrounds/classroom.png', Uint8Array);
        this.load.once(`filecomplete-binary-${key}`, function () {
            var buffer = this.cache.binary.get(key);

            var blob = new Blob([buffer], { type: 'image/png' });
            var blobURL = window.URL.createObjectURL(blob);
            this.load.image(key, blobURL);
            this.load.once(`filecomplete-image-${key}`, function () {
                window.URL.revokeObjectURL(blobURL);
            });
        }, this);
    }

    create() {
        this.add.image(400, 300, 'classroom');
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