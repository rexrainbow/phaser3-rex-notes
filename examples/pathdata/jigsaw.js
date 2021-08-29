import 'phaser';
import PathData from '../../plugins/geom/pathdata/PathData';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.mushrooms;
    }

    preload() {

    }

    create() {
        var graphics = this.add.graphics()
            .setDefaultStyles({
                lineStyle: {
                    width: 1,
                    color: 0x00ff00
                }
            })
        var polygon = CreateJigsawShape(100, 100, {
            left: 1, right: -1, top: -1, bottom: -1
        })
            .offset(0, 300)

        for (var i = 0; i < 4; i++) {
            polygon
                .offset(100, 0)
                .draw(graphics, false, true)
        }
    }

    update() { }
}

var CreateJigsawShape = function (width, height, convexEdges) {
    var x = width / 2,
        y = height / 2;
    var segX = width / 3,
        segY = height / 3;
    var radiusX = width / 6,
        radiusY = height / 6;

    var polygon = new PathData();
    polygon
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
        polygon.lineTo(width, 0).arc(width, y, radiusY, 270, 90).lineTo(width, height)
    } else if (convexRight === -1) {
        polygon.lineTo(width, 0).arc(width, y, radiusY, 270, 90, true).lineTo(width, height)
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

    return polygon;
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
    scene: Demo
};

var game = new Phaser.Game(config);