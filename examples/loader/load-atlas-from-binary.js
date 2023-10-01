import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        var atlasKey = 'knight';
        var imageKey = `atlas-${atlasKey}-image`, imageType = 'png';
        var jsonKey = `atlas-${atlasKey}-json`;
        var LoadAltas = function () {
            var imageBuffer = this.cache.binary.get(imageKey);
            var jsonBuffer = this.cache.binary.get(jsonKey);
            if (!imageBuffer || !jsonBuffer) {
                return;
            }
            this.cache.binary.remove(imageKey);
            this.cache.binary.remove(jsonKey);

            var imageBlob = new Blob([imageBuffer]);
            var imageURL = window.URL.createObjectURL(imageBlob);

            var jsonBlob = new Blob([jsonBuffer]);
            var jsonURL = window.URL.createObjectURL(jsonBlob);

            this.load.atlas(atlasKey, imageURL, jsonURL);

            this.load.once(`filecomplete-atlasjson-${atlasKey}`, function () {
                window.URL.revokeObjectURL(imageURL);
                window.URL.revokeObjectURL(jsonURL);
            });
        };

        this.load.binary(imageKey, 'assets/animations/knight.png', Uint8Array);
        this.load.once(`filecomplete-binary-${imageKey}`, LoadAltas, this);

        this.load.binary(jsonKey, 'assets/animations/knight.json', Uint8Array);
        this.load.once(`filecomplete-binary-${jsonKey}`, LoadAltas, this);

    }

    create() {
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('knight', { prefix: 'idle/frame', start: 0, end: 5, zeroPad: 4 }),
            frameRate: 8,
            repeat: -1
        });

        var sprite = this.add.sprite(400, 300);
        sprite.play('idle');

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