import 'phaser';
import CreateCircleTexture from '../../plugins/utils/texture/CreateCircleTexture.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        CreateCircleTexture(this, 'circle', 100, 0xff0000, 0xffffff, 3);
        this.add.image(400, 300, 'circle');
    }

    update() { }
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
};

var game = new Phaser.Game(config);