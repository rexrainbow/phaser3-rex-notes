import phaser from '../../../phaser/src/phaser.js';
import MeshPlugin from '../../plugins/mesh-plugin.js';
import RotateXYZ from '../../plugins/gameobjects/mesh/mesh/utils/RotateXYZ.js';

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
            .setScale(0.7)
        gameObject
            .addGridFaces({
                columns: Math.ceil(gameObject.width / 64),
                rows: Math.ceil(gameObject.height / 64),
                sharedVertexMode: true
            })

        this.debugGraphics = this.add.graphics();
        gameObject.setDebug(this.debugGraphics);

        RotateXYZ(gameObject, 0, Math.PI * 0.2, 0, 800);
    }

    update() {
        this.debugGraphics.clear();
        this.debugGraphics.lineStyle(2, 0x00ff00);
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