import 'phaser';
import Live2dGameObject from '../../plugins/live2d';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.rexLive2dCoreScript('assets/live2d/core/live2dcubismcore.js');
        this.load.rexLive2d('Haru', 'assets/live2d/Haru/Haru.model3.json');
        this.load.rexLive2d('Hiyori', 'assets/live2d/Hiyori/Hiyori.model3.json');
    }

    create() {
        var x = 1920 / 2,
            y = 1080 / 2;

        var character = new Live2dGameObject(this, x, y, 'Haru', {
            autoPlayIdleMotion: 'TapBody'
        }).setScale(0.5);
        this.add.existing(character);

    }

    update() {
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);