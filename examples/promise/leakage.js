import phaser from 'phaser/src/phaser.js';

class SceneA extends Phaser.Scene {
    constructor() {
        super({
            key: 'SceneA'
        })
    }

    preload() {

    }

    create() {
        this.add.text(0, 0, 'SceneA');

        var scene = this;
        var prom = new Promise(function (resolve) {
            scene.input.once('pointerdown', function () {
                resolve()
            })
        })
            .then(function () {
                scene.add.text(400, 300, 'Hello world')
            })

        this.scene.start('SceneB');
    }

    update() {

    }
}

class SceneB extends Phaser.Scene {
    constructor() {
        super({
            key: 'SceneB'
        })
    }

    preload() {

    }

    create() {
        this.add.text(0, 0, 'SceneB');
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
    scene: [SceneA, SceneB],

};

var game = new Phaser.Game(config);