import phaser from 'phaser/src/phaser.js';
import LoadBinaryAndImage from '../../plugins/utils/loader/LoadBinaryAndImage';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        LoadBinaryAndImage(this, 'card', 'assets/images/card2.png');
    }

    create() {
        this.add.image(400, 300, 'card').setScale(0.3);
    }

    update() {

    }
}

var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    scene: Demo,
};

var game = new Phaser.Game(config);