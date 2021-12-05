import 'phaser';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.binary('card', 'assets/images/card2.png', Uint8Array);
        this.load.on('filecomplete-binary-card', function (key, type, data) {
            var buffer = new Uint8Array(this.cache.binary.get('card'));
            var blob = new Blob([buffer], { type: "image/png" });
            var url = window.URL.createObjectURL(blob);            
            window.open(url, '_blank');
            this.load.image('card', url);
        }, this);
    }

    create() {
        this.add.image('card', 400, 300);
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