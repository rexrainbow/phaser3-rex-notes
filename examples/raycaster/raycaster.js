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
        var raycaster = this.plugins.get('rexRaycaster').add();
        raycaster
            .addObstacle(this.add.rectangle(100, 100, 600, 30, 0x848484).setOrigin(0, 1))
            .addObstacle(this.add.rectangle(100, 500, 600, 30, 0x848484).setOrigin(0, 0))
            .addObstacle(this.add.rectangle(600, 300, 100, 30, 0x848484).setAngle(45))

        var startX = 200, startY = 300;
        var debugGraphics = this.add.graphics();

        RunRaycaster(raycaster,
            startX, startY,
            Phaser.Math.DegToRad(-80),
            debugGraphics);

        this.input.on('pointermove', function (pointer) {

            RunRaycaster(raycaster,
                startX, startY,
                Phaser.Math.Angle.Between(startX, startY, pointer.x, pointer.y),
                debugGraphics
            );
        });
    }

    update() {

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