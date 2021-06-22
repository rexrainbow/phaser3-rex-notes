import 'phaser';
import RaycasterPlugin from '../../plugins/raycaster-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        this.staticObstacles = [
            this.add.rectangle(100, 100, 600, 30, 0x848484).setOrigin(0, 1),
            this.add.rectangle(100, 500, 600, 30, 0x848484).setOrigin(0, 0)
        ]
        this.dynamicObstacles = [
            this.add.rectangle(580, 200, 100, 30, 0xC48434),
            this.add.rectangle(620, 400, 100, 30, 0xC48434).setAngle(90)
        ];
        this.raycaster = this.plugins.get('rexRaycaster').add()
            .addObstacle(this.staticObstacles)
            .addObstacle(this.dynamicObstacles)

        this.debugGraphics = this.add.graphics();
        this.data
            .set('startX', 200)
            .set('startY', 300)

        this.tweens.add({
            targets: this.dynamicObstacles,
            angle: '+=360',
            ease: 'Bounce',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000*30,
            repeat: -1,           // -1: infinity
            yoyo: true
        });
    }

    update() {
        this.raycaster.updateObstacle(this.dynamicObstacles);

        var pointer = this.input.activePointer;
        var x = this.data.get('startX'),
            y = this.data.get('startY'),
            angle = Phaser.Math.Angle.Between(x, y, pointer.worldX, pointer.worldY);
        RunRaycaster(this.raycaster,
            x, y, angle,
            this.debugGraphics
        );
    }
}

var RunRaycaster = function (raycaster, x, y, angle, debugGraphics) {
    debugGraphics
        .clear()
        .fillStyle(0xC4C400)
        .fillCircle(x, y, 10);

    const MaxRaycasterCount = 1000;
    for (var i = 0; i < MaxRaycasterCount; i++) {
        var result = raycaster.rayToward(x, y, angle);
        debugGraphics
            .lineStyle(2, 0x840000)
            .strokeLineShape(raycaster.ray);

        if (result) {
            debugGraphics
                .fillStyle(0xff0000)
                .fillPoint(result.x, result.y, 4)

            x = result.x;
            y = result.y;
            angle = result.reflectAngle;
        } else {
            break;
        }
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexRaycaster',
            plugin: RaycasterPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);