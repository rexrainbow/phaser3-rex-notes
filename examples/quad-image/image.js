import 'phaser';
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
        this.add.image(400, 300, 'card2').setScale(0.5);
        var image = this.add.rexQuadImage(400, 300, 'card2', null, { hideCCW: false }).setAlpha(0.8).setScale(0.5);

        this.debug = this.add.graphics();
        image.setDebug(this.debug);

        CreateControlPoint(this, image.topLeft);
        CreateControlPoint(this, image.topRight);
        CreateControlPoint(this, image.bottomLeft);
        CreateControlPoint(this, image.bottomRight);
    }

    update() {
        this.debug.clear();
        this.debug.lineStyle(1, 0x00ff00);
    }
}

var CreateControlPoint = function (scene, quadVertex) {
    var controlPoint = scene.add.circle(quadVertex.x, quadVertex.y, 10, 0xff0000)
        .setInteractive({ draggable: true })
        .on('drag', function (pointer, dragX, dragY) {
            controlPoint.x = dragX;
            controlPoint.y = dragY;
            quadVertex.x = dragX;
            quadVertex.y = dragY;
        });
    return controlPoint;
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