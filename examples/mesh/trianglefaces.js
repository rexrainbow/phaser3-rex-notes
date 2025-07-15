import phaser from '../../../phaser/src/phaser.js';
import MeshPlugin from '../../plugins/mesh-plugin.js';
import SplitRectangleToTriangles from '../../plugins/utils/math/balancedtriangulate/SplitRectangleToTriangles.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.music;
    }

    preload() {
        this.load.image('card', 'assets/images/card2.png');
    }

    create() {
        var gameObject = this.add.rexMesh(400, 300, '__WHITE')
            .setDisplaySize(400, 400)

        var triangles = SplitRectangleToTriangles({
            width: 1,
            height: 1,
            amount: 30,
            triangleOutput: true
        })
        for (var i = 0, cnt = triangles.length; i < cnt; i++) {
            var triangle = triangles[i];
            var v0 = gameObject.createVertex(triangle.x1, triangle.y1);
            var v1 = gameObject.createVertex(triangle.x2, triangle.y2);
            var v2 = gameObject.createVertex(triangle.x3, triangle.y3);
            var face = gameObject.createFace(v0, v1, v2);
            gameObject.addFace(face);
        }


        this.debugGraphics = this.add.graphics();
        gameObject.setDebug(this.debugGraphics);
    }

    update() {
        this.debugGraphics.clear();
        this.debugGraphics.lineStyle(2, 0xff0000);
    }
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
            key: 'rexMesh',
            plugin: MeshPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);