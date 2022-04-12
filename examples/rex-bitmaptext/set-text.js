import phaser from 'phaser/src/phaser.js';
import BitmapText from '../../plugins/gameobjects/blitter/bitmaptext/BitmapText.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.bitmapFont('gothic', 'assets/fonts/gothic.png', 'assets/fonts/gothic.xml');
    }

    create() {
        var txt = new BitmapText(this, 400, 300, 'gothic', 'ABC');
        this.add.existing(txt);
    }

    update(time) {
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
    scene: Demo
};

var game = new Phaser.Game(config);