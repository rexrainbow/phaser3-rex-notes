import phaser from '../../../phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var rect0 = this.add.rectangle(300, 300, 100, 100).setStrokeStyle(10, 0x4e342e)

        var rect1 = this.add.rectangle(500, 300, 100, 100).setStrokeStyle(10, 0x4e342e)

        var maskGameObject = this.add.rectangle(400, 300, 800, 600, 0xffffff).setVisible(false)

        rect1.enableFilters()
            .filters.external.addMask(maskGameObject)
    }

    update() {
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
    scene: Demo,
};

var game = new Phaser.Game(config);