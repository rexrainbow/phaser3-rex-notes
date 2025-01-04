import phaser from '../../../phaser/src/phaser.js';
import Mesh from '../../plugins/gameobjects/mesh/meshbase/Mesh.js';
import GenerateGridVertices from '../../plugins/gameobjects/mesh/meshbase/methods/GenerateGridVertices.js';

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

        gameObject.setScale(0.5).setAngle(-45)

        GenerateGridVertices(gameObject, 2, 2)

        this.debugGraphics = this.add.graphics();
        gameObject.setDebug(this.debugGraphics);

        var face = gameObject.faces[0];
        face.x -= 200;
        face.angle = 90;

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