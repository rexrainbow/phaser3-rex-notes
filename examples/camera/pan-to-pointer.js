import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('map', 'assets/images/earthbound-scarab.png');
    }

    create() {
        this.add.image(0, 0, 'map').setOrigin(0).setAlpha(0.5);

        var camera = this.cameras.main;
        camera.setZoom(4).centerOn(0, 0);
        var centerPoint = this.add.circle(0, 0, 5, 0xff0000);
        this.input.on('pointerdown', function (pointer) {
            camera.pan(pointer.worldX, pointer.worldY, 1000);
            centerPoint.setPosition(pointer.worldX, pointer.worldY)
        });

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
    scene: Demo
};

var game = new Phaser.Game(config);