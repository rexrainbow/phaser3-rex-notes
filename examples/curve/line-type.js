import phaser from 'phaser/src/phaser.js';
import CurveShapePlugin from '../../plugins/curveshape-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
    }

    create() {
        var graphics = this.add.graphics().setDepth(1);

        CreateCurve(this, 0, 350, undefined, graphics);
        CreateCurve(this, 200, 350, 'spline', graphics);
        CreateCurve(this, 400, 350, 'poly', graphics);
        CreateCurve(this, 600, 350, 'straight', graphics);
    }
}

var GetPoints = function (offsetX, offsetY) {
    return [
        { x: offsetX, y: offsetY },
        { x: offsetX + 100, y: offsetY },
        { x: offsetX + 100, y: offsetY - 100 },
        { x: offsetX + 200, y: offsetY - 100 },
    ]
}

var CreateCurve = function (scene, startX, startY, lineType, graphics) {
    var curve = scene.add.rexCurveShape({
        points: GetPoints(startX, startY),
        color: 0xffffff,
        lineType: lineType
    })
    graphics.lineStyle(2, 0xff0000, 0.5).strokeRectShape(curve.getBounds());
    graphics.fillStyle(0xff0000).fillPoint(startX, startY, 10);

    curve
        .setInteractive()
        .on('pointerover', function () {
            curve.setStrokeStyle(2, 0x00ff00)
        })
        .on('pointerout', function () {
            curve.setStrokeStyle(2, 0xffffff)
        })

    return curve;
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
    plugins: {
        global: [{
            key: 'rexCurveShape',
            plugin: CurveShapePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);