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
        this.load.atlas('knight', 'assets/animations/knight.png', 'assets/animations/knight.json');
    }

    create() {
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('knight', { prefix: 'idle/frame', start: 0, end: 5, zeroPad: 4 }),
            frameRate: 8,
            repeat: -1
        });

        var gameObject = this.add.rexMesh(400, 300, 'card')
            .setScale(2)
            .addGridFaces(1, 1);

        gameObject.anims.play('idle');

        this.debugGraphics = this.add.graphics();
        gameObject.setDebug(this.debugGraphics);

        var face = gameObject.faces[0];
        face.x -= 100;
        face.angle = -90;

        this.print = this.add.text(0,0,'');
        this.meshFace = gameObject.faces[0];
    }

    update() {
        this.debugGraphics.clear();
        this.debugGraphics.lineStyle(2, 0xff0000);

        var face = this.meshFace
        var s = `\
${face.vertex0.localX}, ${face.vertex0.localY}
${face.vertex1.localX}, ${face.vertex1.localY}
${face.vertex2.localX}, ${face.vertex2.localY}\
`
        this.print.text = s;
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