import 'phaser';
import CustomShapesPlugin from '../../plugins/customshapes-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var jigsaw = CreateJigsawShape(this,
            {
                left: 1, right: -1, top: -1, bottom: -1,
            },
            undefined, 0x00ff00
        )
            .setPosition(400, 300)
            .setSize(100, 100)

        jigsaw
            .updateData()
            .setInteractive({
                hitArea: jigsaw.getShapes()[0].toPolygon(),
                hitAreaCallback: Phaser.Geom.Polygon.Contains,
                draggable: true
            })
            .on('drag', function (pointer, dragX, dragY) {
                this.setPosition(dragX, dragY);
            })

        //var graphics = this.add.graphics({
        //    lineStyle: {
        //        width: 2, color: 0xff0000, alpha: 1
        //    }
        //})
        //    .strokeRectShape(jigsaw.getBounds())

    }

    update() { }
}

var CreateJigsawShape = function (scene, convexEdges, fillColor, strokeColor) {
    return scene.add.rexCustomShapes({
        type: 'Jigsaw',
        create: { lines: 1 },
        update: function () {
            var width = this.width,
                height = this.height;
            var x = width / 2,
                y = height / 2;
            var segX = width / 3,
                segY = height / 3;
            var radiusX = width / 6,
                radiusY = height / 6;

            var polygon = this.getShapes()[0]
                .lineStyle(2, strokeColor, 1)
                .fillStyle(fillColor, 1)
                .setIterations(8)
                .startAt(0, 0)

            var convexTop = convexEdges.top;
            if (convexTop === 1) {
                polygon.lineTo(segX, 0).arc(x, 0, radiusX, 180, 360).lineTo(width, 0)
            } else if (convexTop === -1) {
                polygon.lineTo(segX, 0).arc(x, 0, radiusX, 180, 360, true).lineTo(width, 0)
            } else {
                polygon.lineTo(width, 0)
            }

            var convexRight = convexEdges.right;
            if (convexRight === 1) {
                polygon.lineTo(width, segY).arc(width, y, radiusY, 270, 90).lineTo(width, height)
            } else if (convexRight === -1) {
                polygon.lineTo(width, segY).arc(width, y, radiusY, 270, 90, true).lineTo(width, height)
            } else {
                polygon.lineTo(width, height)
            }

            var convexBottom = convexEdges.bottom;
            if (convexBottom === 1) {
                polygon.lineTo(width - segX, height).arc(x, height, radiusX, 0, 180).lineTo(0, height)
            } else if (convexBottom === -1) {
                polygon.lineTo(width - segX, height).arc(x, height, radiusX, 0, 180, true).lineTo(0, height)
            } else {
                polygon.lineTo(0, height)
            }

            var convexLeft = convexEdges.left;
            if (convexLeft === 1) {
                polygon.lineTo(0, height - segY).arc(0, y, radiusY, 90, 270).lineTo(0, 0)
            } else if (convexLeft === -1) {
                polygon.lineTo(0, height - segY).arc(0, y, radiusY, 90, 270, true).lineTo(0, 0)
            } else {
                polygon.lineTo(0, 0)
            }

            polygon
                .close();

        }
    })
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
            key: 'CustomShapesPlugin',
            plugin: CustomShapesPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);