import phaser from '../../../phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var camera0 = this.cameras.add(0, 0, 400, 300).setScroll(1000, 1000);
        var camera1 = this.cameras.add(400, 0, 400, 300).setScroll(1000, 1000);
        var camera2 = this.cameras.add(400, 300, 400, 300).setScroll(1000, 1000);
        var camera3 = this.cameras.add(0, 300, 400, 300).setScroll(1000, 1000);

        var gameObject = CreateGameObject(this)
            .setPosition(1200, 1150);

        this.cameras.main.ignore(gameObject);
    }

    update() { }
}

var CreateGameObject = function (scene) {
    var image = scene.add.image(0, 0, 'classroom')

    var maskGameObject = scene.add.circle(0, 0, 300, 0x330000)
        .setVisible(false);

    image.enableFilters()
        .filters.external.addMask(maskGameObject);

    var gameObject = scene.add.container(200, 150, [image, maskGameObject]).setAlpha(0.5).setScale(0.5);

    return gameObject;
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