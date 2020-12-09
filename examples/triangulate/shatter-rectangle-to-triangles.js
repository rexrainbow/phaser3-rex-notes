import ShatterRectangleToTriangles from '../../plugins/utils/math/triangulate/ShatterRectangleToTriangles.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var graphics = this.add.graphics();
        var rectangle = new Phaser.Geom.Rectangle(0, 0, 800, 600);

        this.input.on('pointerdown', function (pointer) {
            var triangles = ShatterRectangleToTriangles(rectangle, pointer);
            graphics.clear();
            for (var i = 0, cnt = triangles.length; i < cnt; i++) {
                graphics
                    .lineStyle(2, 0x00ffff)
                    .strokeTriangleShape(triangles[i]);
            }
        })
        this.input.emit('pointerdown')
    }

    update() {
    }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);