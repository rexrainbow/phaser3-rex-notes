import Snapshot from '../../plugins/utils/rendertexture/Snapshot.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var gameObjects = [
            this.add.rectangle(400, 300, 200, 200, 0xC4C400),
            this.add.rectangle(300, 200, 200, 200, 0xC400C4),
            this.add.rectangle(300, 400, 200, 200, 0x00C4C4),
        ]

        var rt = Snapshot(gameObjects, null, 400, 300);

        gameObjects.forEach(function (gameObject) {
            gameObject.destroy();
        });

        this.add.graphics()
            .lineStyle(3, 0xffffff)
            .strokeRectShape(rt.getBounds())
    }

    update() {
    }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);