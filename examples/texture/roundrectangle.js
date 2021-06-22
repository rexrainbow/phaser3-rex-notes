import 'phaser';
import CreateRoundRectangleTexture from '../../plugins/utils/texture/CreateRoundRectangleTexture.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        CreateRoundRectangleTexture(this, 'roundrectangle', 200, 100, 20, 0xff0000, 0xffffff, 3, 0x000000, true);
        this.add.image(400, 300, 'roundrectangle');
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