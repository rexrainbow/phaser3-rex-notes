class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
        this.load.image('textureKey', 'assets/img.png');
    }

    create() {
        this.add.image(300, 400, 'textureKey');
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 600,
    height: 800,
    scene: Demo
};

var game = new Phaser.Game(config);