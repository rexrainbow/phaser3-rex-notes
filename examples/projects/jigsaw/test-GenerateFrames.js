import phaser from 'phaser/src/phaser.js';
import GenerateFrames from './lib/generateframes/GenerateFrames.js';

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
        GenerateFrames(this, {
            baseKey: 'classroom',
            targetKey: 'pieces',
            columns: 8, rows: 6,
        })
        this.add.image(0, 0, 'pieces', '__BASE').setOrigin(0).setScale(0.8);
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