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
            .setScale(0.5).setAngle(-45).setOrigin(1)
            .addGridFaces({
                columns: 1, rows: 1,
                sharedVertexMode: true
            })

        this.debugGraphics = this.add.graphics();
        gameObject.setDebug(this.debugGraphics);

        var vertices = gameObject.vertices;

        // Test localXY
        vertices[0].localY -= 200;
        vertices[2].localY += 200;

        this.add.circle(vertices[0].x, vertices[0].y, 10, 0x880000);
        this.add.circle(vertices[2].x, vertices[2].y, 10, 0x880000);

        // Test worldXY
        var controlPoint = this.add.circle(vertices[3].x, vertices[3].y, 10, 0xff0000)
            .setInteractive({ draggable: true })
            .on('drag', function (pointer, dragX, dragY) {
                controlPoint.setPosition(dragX, dragY);
                vertices[3].setPosition(dragX, dragY);
            });
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