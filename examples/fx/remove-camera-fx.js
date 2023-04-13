import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        CreateGameObject(this, 400, 300).setOrigin(0.5);

        var camera = this.cameras.main;
        var effect = camera.postFX.addPixelate(10);        
        camera.postFX.remove(effect);

    }

    update() { }
}

var CreateGameObject = function (scene, x, y) {
    return scene.add.text(x, y, 'Phaser3\nPhaser3\nPhaser3\nPhaser3\nPhaser3\nPhaser3\nPhaser3\nPhaser3', {
        fontSize: 25,
    })
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