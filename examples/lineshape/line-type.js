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

        CreateLine(this, 100, 200, undefined, graphics);
        CreateLine(this, 500, 200, 'spline', graphics);
        CreateLine(this, 100, 500, 'poly', graphics);
        CreateLine(this, 500, 500, 'straight', graphics);
    }
}

var CreateLine = function (scene, x, y, lineType, graphics) {
    var line = scene.add.rexLineShape({
        points: [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 100, y: - 100 },
    { x: 200, y: - 100 },
],
        color: 0xffffff,
        lineType: lineType
    }).setPosition(x, y)
    graphics.lineStyle(2, 0xff0000, 0.5).strokeRectShape(line.getBounds());

    var points = line.getPoints();
    for (var i = 0, cnt = points.length; i < cnt; i++) {
        graphics.fillStyle(0xff0000).fillPoint(points[i].x, points[i].y, 10);
    }


    line
        .setInteractive()
        .on('pointerover', function () {
            line.setStrokeStyle(2, 0x00ff00)
        })
        .on('pointerout', function () {
            line.setStrokeStyle(2, 0xffffff)
        })

    return line;
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