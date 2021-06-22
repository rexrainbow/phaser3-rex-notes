import 'phaser';
import CreateRectangleTexture from '../../plugins/utils/texture/CreateRectangleTexture.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        CreateRectangleTexture(this, 'rectangle', 200, 100, 0xff0000, 0xffffff, 3, 0x000000, true);
        this.add.image(400, 300, 'rectangle');
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