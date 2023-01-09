import phaser from 'phaser/src/phaser.js';
import WaitEventsPlugin from '../../plugins/waitevents-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        var atlasKey = 'knight'
        var imageKey = `atlas-${atlasKey}-image`, imageType = 'png';
        var jsonKey = `atlas-${atlasKey}-json`;
        var waitEvents = this.plugins.get('rexWaitEvents').add(function () {
            var imageBuffer = this.cache.binary.get(imageKey);
            var imageBlob = new Blob([imageBuffer], { type: `image/${imageType}` });
            var imageURL = window.URL.createObjectURL(imageBlob);

            var jsonBuffer = this.cache.binary.get(jsonKey);
            var jsonBlob = new Blob([jsonBuffer], { type: 'application/json' });
            var jsonURL = window.URL.createObjectURL(jsonBlob);

            this.load.atlas(atlasKey, imageURL, jsonURL);
        }, this);

        this.load.binary(imageKey, 'assets/animations/knight.png', Uint8Array);
        waitEvents.waitEvent(this.load, `filecomplete-binary-${imageKey}`);

        this.load.binary(jsonKey, 'assets/animations/knight.json', Uint8Array);
        waitEvents.waitEvent(this.load, `filecomplete-binary-${jsonKey}`);

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
    scene: Demo,
    plugins: {
        global: [
            {
                key: 'rexWaitEvents',
                plugin: WaitEventsPlugin,
                start: true
            },
        ]
    }
};

var game = new Phaser.Game(config);