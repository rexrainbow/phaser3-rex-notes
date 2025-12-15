import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.print;
    }

    preload() {
    }

    create() {
        var text = this.add.text(0, 0, '0\n1\n2\n3', { fontSize: 72 });
        var container = this.add.container()
            .add(text)
            .setSize(200, text.height)
            .setPosition(400, 300)

        text.x -= container.width * container.originX;
        text.y -= container.height * container.originY;

        this.add.rectangle(container.x, container.y, container.width, container.height)
            .setStrokeStyle(3, 0xff0000)

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