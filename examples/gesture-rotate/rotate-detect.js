import GesturesPlugin from '../../plugins/gestures-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var gameObejects = DrawSomething(this);

        this.rexGestures.add.rotate()
            .on('rotate', function (rotate) {
                rotate.spinObject(gameObejects);
            })
            .on('drag1', function (rotate) {
                var dragVector = rotate.drag1Vector;
                var gameObeject;
                for (var i = 0, cnt = gameObejects.length; i < cnt; i++) {
                    gameObeject = gameObejects[i];
                    gameObeject.x += dragVector.x;
                    gameObeject.y += dragVector.y;
                }
            })
    }
}

const RandomBetween = Phaser.Math.Between;
var DrawSomething = function (scene) {
    var gameObjects = []
    for (var i = 0; i < 20; i++) {
        gameObjects.push(
            scene.add.rectangle(
                RandomBetween(50, 750), RandomBetween(50, 550),
                RandomBetween(20, 50), RandomBetween(20, 50),
                RandomBetween(0, 0x1000000)
            )
        );
    }
    return gameObjects;
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
    plugins: {
        scene: [{
            key: 'rexGestures',
            plugin: GesturesPlugin,
            mapping: 'rexGestures'
        }]
    }
};

var game = new Phaser.Game(config);