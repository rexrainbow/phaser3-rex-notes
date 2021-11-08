import 'phaser';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var graphics = this.add.graphics();

        var camera = this.cameras.main;
        var rect = new Phaser.Geom.Rectangle(camera.x, camera.y, camera.width, camera.height);
        graphics
            .clear()
            .lineStyle(10, 0xff0000)
            .strokeRectShape(rect)
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
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);