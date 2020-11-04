import Reflect from '../../plugins/math/reflect/Reflect.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var rect0 = this.add.rectangle(100, 100, 600, 30, 0x848484).setOrigin(0, 1);
        var rect1 = this.add.rectangle(100, 500, 600, 30, 0x848484).setOrigin(0, 0);
        var reflect = new Reflect();
        reflect.addObstacle(rect0).addObstacle(rect1);

        var debugGraphics = this.add.graphics();
        var x = 200, y = 300, angle = Phaser.Math.DegToRad(-80),
            result;

        for (var i = 0; i < 1000; i++) {
            console.log(i, x, y, Phaser.Math.RadToDeg(angle));
            result = reflect.rayToward(x, y, angle);
            debugGraphics
                .lineStyle(2, 0x840000)
                .strokeLineShape(reflect.ray);

            if (result) {
                debugGraphics
                    .fillStyle(0xff0000)
                    .fillPoint(result.hitX, result.hitY, 10)

                x = result.hitX;
                y = result.hitY;
                angle = result.reflectAngle;
            } else {
                break;
            }
        }
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