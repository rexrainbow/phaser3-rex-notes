import phaser from '../../../phaser/src/phaser.js';
import Mesh from '../../plugins/gameobjects/mesh/mesh/Mesh.js';

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
        var gameObject = new Mesh(this, 400, 300, 'card');
        this.add.existing(gameObject);

        gameObject.setScale(0.5)

        var vertex0 = gameObject.createVertex(0, 0);
        var vertex1 = gameObject.createVertex(1, 0);
        var vertex2 = gameObject.createVertex(0, 1);
        var vertex3 = gameObject.createVertex(1, 1);

        var face0 = gameObject.createFace(vertex0, vertex2, vertex3);
        var face1 = gameObject.createFace(vertex0, vertex3, vertex1);

        gameObject.addFaces([face0, face1]);

        this.debugGraphics = this.add.graphics();
        gameObject.setDebug(this.debugGraphics);

        vertex0.y -= 200;
        vertex2.y += 200;
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
    scene: Demo
};

var game = new Phaser.Game(config);