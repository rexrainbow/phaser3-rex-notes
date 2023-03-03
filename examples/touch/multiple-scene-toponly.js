import phaser from 'phaser/src/phaser.js';

class SceneA extends Phaser.Scene {
    constructor() {
        super({
            key: 'sceneA',
            active: true
        })
    }

    preload() { }

    create() {
        this.scene.moveUp();

        this.input.topOnly = false;
        CreateGameObjects(this)
            .setPosition(200, 300)
            .setAlpha(0.5)
    }

    update(time, delta) {
    }
}

class SceneB extends Phaser.Scene {
    constructor() {
        super({
            key: 'sceneB',
            active: true
        })
    }

    preload() { }

    create() {
        var bg = this.add.rectangle(400, 300, 800, 600, 0x555555)
            .setName(`${this.sys.settings.key}-BG`)
            .setInteractive()
            .on('pointerdown', function () {
                console.log(`Click ${this.name}`)
            })

        CreateGameObjects(this)
            .setPosition(600, 300)


    }

    update(time, delta) {
    }
}

var CreateGameObjects = function (scene) {
    var go0 = scene.add.rectangle(-50, -50, 200, 200, 0x00ff00)
        .setName(`${scene.sys.settings.key}-GO0`)
        .setInteractive()
        .on('pointerdown', function () {
            console.log(`Click ${this.name}`)
        })
    var go1 = scene.add.rectangle(50, 50, 200, 200, 0x0000ff)
        .setName(`${scene.sys.settings.key}-GO1`)
        .setInteractive()
        .on('pointerdown', function () {
            console.log(`Click ${this.name}`)
        })
    return scene.add.container(0, 0, [go0, go1])

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
    scene: [SceneA, SceneB]
};

var game = new Phaser.Game(config);