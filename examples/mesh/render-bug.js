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
        this.load.atlas('poker', 'assets/images/poker/poker.png', 'assets/images/poker/poker.json');
    }

    create() {
        var gameObject = this.add.rexMesh(400, 300, 'poker')
            .setScale(1.5)
            .addGridFaces({
                columns: 1, rows: 2,
                sharedVertexMode: true
            })

        this.input
            .on('pointerdown', function () {
                if (gameObject.texture.key === 'poker') {
                    gameObject.setTexture('card').setScale(0.5)
                } else {
                    gameObject.setTexture('poker').setScale(2)
                }
            })

        this.debugGraphics = this.add.graphics();
        gameObject.setDebug(this.debugGraphics);
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
        global: [
            {
                key: 'rexMesh',
                plugin: MeshPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);