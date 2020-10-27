class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var gameObjects = [
            this.add.rectangle(400, 300, 200, 200, 0xC4C400),
            this.add.rectangle(300, 200, 200, 200, 0xC400C4),
            this.add.rectangle(300, 400, 200, 200, 0x00C4C4),
        ]

        var rt = this.add.renderTexture(0, 0, 500, 500)
            .setOrigin(0)
        rt.camera.setPosition(-200, 0)
        rt.draw(gameObjects);

        gameObjects.forEach(function (gameObject) {
            gameObject.setAlpha(0.3);
        });

        this.add.graphics()
            .lineStyle(3, 0x0000ff)
            .strokeRectShape(rt.getBounds())
    }

    update() {
    }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);