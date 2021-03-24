import Shapes from '../../plugins/gameobjects/shape/shapes/Shapes.js';
import {
    Arc as ArcShape,
    Circle as CircleShape,
    Rectangle as RectangleShape,
    Triangle as TriangleShape
} from '../../plugins/gameobjects/shape/shapes/shape';

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
                (new CircleShape(25, 25, 25)).fillStyle(0xff0000)
            )
            .addShape(
                (new RectangleShape(50, 0, 50, 50)).fillStyle(0x00ff00)
            )
            .addShape(
                (new TriangleShape(50, 50, 100, 50, 50, 100)).fillStyle(0x0000ff)
            )
            .addShape(
                (new ArcShape(50, 50, 50, 50, 90, 180)).lineStyle(2, 0xffffff)
            )
            .setOrigin(0)
            .setAngle(45)

        this.add.rectangle(400, 300, 100, 100).setStrokeStyle(2, 0xff0000)
            .setOrigin(0)
            .setAngle(45)
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