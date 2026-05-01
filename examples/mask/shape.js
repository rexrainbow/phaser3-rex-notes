import Phaser from 'phaser';
import { SetMask, ClearMask } from '../../plugins/utils/mask/MaskMethods.js';

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
        var image = this.add.image(400, 300, 'classroom')
        var maskGameObject = this.add.circle(400, 300, 300, 0x330000)
            .setVisible(false);

        image.enableFilters()
            .filters.external.addMask(maskGameObject);
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
    scene: Demo
};

var game = new Phaser.Game(config);