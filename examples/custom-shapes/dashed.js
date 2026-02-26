import phaser from 'phaser/src/phaser.js';
import CustomShapesPlugin from '../../plugins/customshapes-plugin.js';


const FILL_COLOR = 0x1B1F2A;
const STROKE_COLOR = 0x2F3B55;
const LINE_WIDTH = 4;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        CreateTriangleShape(this)
            .setSize(200, 200)
            .setPosition(150, 200)

        CreateRoundRectangleShape(this)
            .setSize(200, 200)
            .setPosition(400, 200)

        CreateRectangleShape(this)
            .setSize(200, 200)
            .setPosition(650, 200)

        CreatePieShape(this)
            .setSize(200, 200)
            .setPosition(150, 450)

    }

    update() { }
}

var CreateRoundRectangleShape = function (scene) {
    return scene.add.rexCustomShapes({
        type: 'shape',
        create: {
            roundRectangle: 1
        },
        update: function () {
            var centerX = this.width / 2,
                centerY = this.height / 2,
                radius = Math.min(centerX, centerY);
            var width = radius * 2,
                height = width;
            var x = centerX - radius,
                y = centerY - radius;
            var radius = LINE_WIDTH * 3;

            var shape = this.getShapes()[0];
            if (this.isSizeChanged) {
                var halfBoxLineWidth = LINE_WIDTH / 2;
                shape
                    .setTopLeftPosition(x + halfBoxLineWidth, y + halfBoxLineWidth)
                    .setSize(width - LINE_WIDTH, height - LINE_WIDTH)
                    .setRadius(radius)
                    .setDashPattern([40, 20])
            }

            shape.fillStyle(FILL_COLOR).lineStyle(LINE_WIDTH, STROKE_COLOR)
        }
    })
}

var CreateTriangleShape = function (scene) {
    return scene.add.rexCustomShapes({
        type: 'shape',
        create: {
            triangle: 1
        },
        update: function () {
            var centerX = this.width / 2,
                centerY = this.height / 2;

            var shape = this.getShapes()[0];
            if (this.isSizeChanged) {
                var halfBoxLineWidth = LINE_WIDTH / 2;
                shape
                    .setP0(centerX, 0 + halfBoxLineWidth)
                    .setP1(0 + halfBoxLineWidth, this.height - halfBoxLineWidth)
                    .setP2(this.width - halfBoxLineWidth, this.height - halfBoxLineWidth)
                    .setDashPattern([30, 30])
            }

            shape.fillStyle(FILL_COLOR).lineStyle(LINE_WIDTH, STROKE_COLOR)
        }
    })
}

var CreateRectangleShape = function (scene) {
    return scene.add.rexCustomShapes({
        type: 'shape',
        create: {
            rectangle: 1
        },
        update: function () {
            var centerX = this.width / 2,
                centerY = this.height / 2;

            var shape = this.getShapes()[0];
            if (this.isSizeChanged) {
                shape
                    // Set size before set center
                    .setSize(this.width - LINE_WIDTH, this.height - LINE_WIDTH)
                    .setCenterPosition(centerX, centerY)
                    .setDashPattern({
                        segments: 8
                    })
            }

            shape.fillStyle(FILL_COLOR).lineStyle(LINE_WIDTH, STROKE_COLOR)
        }
    })
}

var CreatePieShape = function (scene) {
    return scene.add.rexCustomShapes({
        type: 'shape',
        create: {
            arc: 1
        },
        update: function () {
            var centerX = this.width / 2,
                centerY = this.height / 2;

            var shape = this.getShapes()[0];
            if (this.isSizeChanged) {
                var halfBoxLineWidth = LINE_WIDTH / 2;
                shape
                    .setRadius(centerX - halfBoxLineWidth, centerY - halfBoxLineWidth)
                    .setCenterPosition(centerX, centerY)
                    .setAngle(270 - 45, 270 + 45)
                    .setPie()
                    .setDashPattern([30, 30])
            }

            shape.fillStyle(FILL_COLOR).lineStyle(LINE_WIDTH, STROKE_COLOR)
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