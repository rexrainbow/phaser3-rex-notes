import phaser from 'phaser/src/phaser.js';
import Jigsaw from '../../templates/jigsaw/index';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var result = Jigsaw.GenerateFrames(this, {
            baseKey: 'classroom',
            targetKey: 'pieces',
            columns: 8, rows: 6,
            edgeWidth: 15, edgeHeight: 15
        })
        this.add.image(0, 0, 'pieces', '__BASE').setOrigin(0);

        console.log(result)

        // Frame name = `${c},${r}`
        var piece = this.add.image(950, 700, 'pieces', result.getFrameNameCallback(7, 5));
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1024,
    height: 768,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
};

var game = new Phaser.Game(config);