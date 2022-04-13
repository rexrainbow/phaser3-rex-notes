import phaser from 'phaser/src/phaser.js';
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
        this.add.image(200, 300, 'gothic', 'H');
        this.add.image(250, 300, 'gothic', 'E');
        this.add.image(300, 300, 'gothic', 'L');
        this.add.image(350, 300, 'gothic', 'L');
        this.add.image(400, 300, 'gothic', 'O');
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