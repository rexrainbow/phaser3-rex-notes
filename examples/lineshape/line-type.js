import phaser from 'phaser/src/phaser.js';
import LineShapePlugin from '../../plugins/lineshape-plugin.js';

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

        CreateLine(this, 0, 350, undefined, graphics);
        CreateLine(this, 200, 350, 'spline', graphics);
        CreateLine(this, 400, 350, 'poly', graphics);
        CreateLine(this, 600, 350, 'straight', graphics);
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

var CreateLine = function (scene, startX, startY, lineType, graphics) {
    var points = GetPoints(startX, startY);
    var curve = scene.add.rexLineShape({
        points: points,
        color: 0xffffff,
        lineType: lineType
    })
    graphics.lineStyle(2, 0xff0000, 0.5).strokeRectShape(curve.getBounds());

    for (var i = 0, cnt = points.length; i < cnt; i++) {
        graphics.fillStyle(0xff0000).fillPoint(points[i].x, points[i].y, 10);
    }


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
            key: 'rexLineShape',
            plugin: LineShapePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);