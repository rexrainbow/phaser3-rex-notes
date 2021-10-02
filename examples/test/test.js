import 'phaser';
class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
    }

}

var config = {
    type: Phaser.AUTO,
    parent: 'main',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);