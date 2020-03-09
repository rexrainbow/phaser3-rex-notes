import TweenPromise from '../../plugins/utils/promise/TweenPromise.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
    }

    create() {
        var gameObject0, gameObject1;

        var scene = this;
        gameObject0 = this.add.rectangle(300, 200, 100, 100, 0xffffff);
        TweenPromise(scene, {
            targets: gameObject0,
            x: 400,
            y: 300,
            duration: 1000,
        })
            .then(function () {
                gameObject1 = scene.add.rectangle(500, 200, 80, 80, 0xffffff)
                return TweenPromise(scene, {
                    targets: gameObject1,
                    angle: 135,
                    duration: 1000
                })
            })
            .then(function () {
                return TweenPromise(scene, {
                    targets: gameObject0,
                    alpha: 0.5,
                    duration: 1000
                })
            })
            .then(function () {
                gameObject1.destroy();
            })
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