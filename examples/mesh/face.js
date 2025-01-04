import phaser from '../../../phaser/src/phaser.js';
import Mesh from '../../plugins/gameobjects/mesh/meshbase/Mesh.js';

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

        var face0 = gameObject.createFace();
        face0.setNormalUV(/*0*/ 0, 0, /*2*/ 0, 1, /*3*/ 1, 1);

        var face1 = gameObject.createFace();
        face1.setNormalUV(/*0*/ 0, 0, /*3*/ 1, 1, /*1*/ 1, 0);

        gameObject.addFaces([face0, face1]);

        this.debugGraphics = this.add.graphics();
        gameObject.setDebug(this.debugGraphics);

        face0.x -= 300;
        face0.angle = 90;

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