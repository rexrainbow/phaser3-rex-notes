import 'phaser';
import ContainerLite from '../../plugins/gameobjects/containerlite/ContainerLite';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var container = new ContainerLite(this, 400, 300, 200, 200)
        this.add.existing(container)
        var rect = new Phaser.GameObjects.Rectangle(this, 400, 300, 200, 200, 0xff0000);
        container.add(rect);
        this.scene.stop();
        debugger
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