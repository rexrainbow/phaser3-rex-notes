import 'phaser';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.binary('card', 'assets/images/card2.png', Uint8Array);
        this.load.once('filecomplete-binary-card', function () {
            var buffer = new Uint8Array(this.cache.binary.get('card'));
            var blob = new Blob([buffer], { type: "image/png" });
            var url = window.URL.createObjectURL(blob);
            this.load.image('card', url);
            this.load.once('filecomplete-image-card', function () {
                window.URL.revokeObjectURL(url);
            })
        }, this);
    }

    create() {
        this.add.image(400, 300, 'card');
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