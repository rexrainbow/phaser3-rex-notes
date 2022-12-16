import phaser from 'phaser/src/phaser.js';
import CustomProgressPlugin from '../../plugins/customprogress-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var image0 = this.add.image(400, 300, 'classroom').setScale(0.75);

        var maskGameObject = CreateMask(this, 8, 8)
            .setSize(800, 600).setScale(0.75)
            .setPosition(400, 300)

        image0.setMask(
            maskGameObject.createGeometryMask()
        );

        maskGameObject
            .setEaseValueDuration(4000)
            .easeValueTo(1)

    }

    update() { }
}

var CreateMask = function (scene, columnCount, rowCount) {
    if (columnCount === undefined) { columnCount = 2; }
    if (rowCount === undefined) { rowCount = 2; }

    return scene.add.rexCustomProgress({
        type: 'Graphics',
        create: {
            roundRectangle: columnCount * rowCount
        },
        update: function () {
            var gridWidth = this.width / columnCount,
                gridHeight = this.height / rowCount;

            var shapes = this.getShapes();
            var threshold = 0.2;
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var columnIndex = Math.floor(i / columnCount);
                var rowIndex = i % columnCount;

                var x, y, rectWidth, rectHeight, radius;
                if (this.value < threshold) {
                    var t = this.value / threshold; // t=0~1
                    rectWidth = gridWidth;
                    rectHeight = gridHeight;
                    x = gridWidth * columnIndex;
                    y = gridHeight * rowIndex;
                    radius = (Math.min(rectWidth, rectHeight) / 2) * t;
                } else {
                    var t = (this.value - threshold) / (1 - threshold);  // t=0~1
                    rectWidth = gridWidth * (1 - t);
                    rectHeight = gridHeight * (1 - t);
                    radius = Math.min(rectWidth, rectHeight) / 2;
                    x = gridWidth * (columnIndex + 0.5) - (rectWidth / 2);
                    y = gridHeight * (rowIndex + 0.5) - (rectHeight / 2);
                }

                shapes[i]
                    .fillStyle(0xffffff, 1)
                    .setSize(rectWidth, rectHeight)
                    .setTopLeftPosition(x, y)
                    .setRadius(radius)
            }

        },
    })
        .setVisible(false)
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
            key: 'CustomProgressPlugin',
            plugin: CustomProgressPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);