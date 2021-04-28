import DynamicText from '../../plugins/gameobjects/canvas/dynamictext/DynamicText.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var text = new DynamicText(this, 400, 300, 200, 100, {
            background: {
                strokeColor: 0xff0000,
                cornerRadius: 20
            },
            padding: 20,
            text: 'aabb'
        })
        this.add.existing(text);

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