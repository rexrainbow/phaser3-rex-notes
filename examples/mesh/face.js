import phaser from '../../../phaser/src/phaser.js';
import MeshPlugin from '../../plugins/mesh-plugin.js';

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
        var gameObject = this.add.rexMesh(400, 300, 'card')
            .setScale(0.5).setAngle(-45)
            .clear().addGridFaces(2, 2);

        this.debugGraphics = this.add.graphics();
        gameObject.setDebug(this.debugGraphics);

        var face = gameObject.faces[0];
        face.x -= 200;
        face.angle = -90;

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