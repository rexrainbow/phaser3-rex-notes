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
        var image0 = CreateCard(this, 200, 300, false);
        var image1 = CreateCard(this, 500, 300, true);

        this.debug = this.add.graphics();
        image0.setDebug(this.debug);
        image1.setDebug(this.debug);
    }

    update() {
        this.debug.clear();
        this.debug.lineStyle(1, 0x00ff00);
    }
}

var CreateCard = function (scene, x, y, rtl) {
    scene.add.image(x, y, 'card2').setScale(0.5);
    var image = scene.add.rexQuadImage(x, y, 'card2', null, {
        hideCCW: false,
        rtl: rtl
    }).setAlpha(0.8).setScale(0.5);

    var controlPoints = image.controlPoints;
    for (var i = 0, cnt = controlPoints.length; i < cnt; i++) {
        CreateControlCircle(scene, controlPoints[i]);
    }

    return image;
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