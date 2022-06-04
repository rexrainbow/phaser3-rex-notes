import phaser from 'phaser/src/phaser.js';
import QuadImagePlugin from '../../plugins/quadimage-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('card2', 'assets/images/card2.png');
    }

    create() {
        this.add.image(800, 600, 'card2').setAngle(45);
        var image = this.add.rexQuadImage(800, 600, 'card2', null, { hideCCW: false })
            .setAngle(45)

        this.debug = this.add.graphics();
        image.setDebug(this.debug);

        var controlPoints = image.controlPoints;
        for (var i = 0, cnt = controlPoints.length; i < cnt; i++) {
            CreateControlCircle(this, controlPoints[i]);
        }
    }

    update() {
        this.debug.clear();
        this.debug.lineStyle(1, 0x00ff00);
    }
}

var CreateControlCircle = function (scene, controlPoint) {
    var circle = scene.add.circle(controlPoint.x, controlPoint.y, 10, 0xff0000)
        .setInteractive({ draggable: true })
        .on('drag', function (pointer, dragX, dragY) {
            circle.x = dragX;
            circle.y = dragY;
            controlPoint.setPosition(dragX, dragY);
        });

    return circle;
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    backgroundColor: 0x33333,
    plugins: {
        global: [{
            key: 'rexQuadImage',
            plugin: QuadImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);