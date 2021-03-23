import Shapes from '../../plugins/gameobjects/shape/shapes/Shapes.js';
import RectangleShape from '../../plugins/gameobjects/shape/shapes/shape/Rectangle.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var gameObject = new Shapes(this, 400, 300, 100, 100);
        this.add.existing(gameObject);

        gameObject
            .addShape(
                (new RectangleShape(0, 0, 50, 50)).fillStyle(0xff0000)
            )
            .addShape(
                (new RectangleShape(50, 0, 50, 50)).fillStyle(0x00ff00)
            )
            .addShape(
                (new RectangleShape(50, 50, 50, 50)).fillStyle(0x0000ff)
            )
            .addShape(
                (new RectangleShape(0, 50, 50, 50)).fillStyle(0xffffff)
            )
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