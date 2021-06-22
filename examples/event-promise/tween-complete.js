import 'phaser';
import EventPromisePlugin from '../../plugins/eventpromise-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
    }

    create() {
        var WaitComplete = this.plugins.get('rexEventPromise').waitComplete;
        var gameObject0, gameObject1;

        var scene = this;
        gameObject0 = this.add.rectangle(300, 200, 100, 100, 0xffffff);

        WaitComplete(scene.tweens.add({
            targets: gameObject0,
            x: 400,
            y: 300,
            duration: 1000
        }))
            .then(function () {
                gameObject1 = scene.add.rectangle(500, 200, 80, 80, 0xffffff)
                return WaitComplete(scene.tweens.add({
                    targets: gameObject1,
                    angle: 135,
                    duration: 1000
                }))
            })
            .then(function () {
                return WaitComplete(scene.tweens.add({
                    targets: gameObject0,
                    alpha: 0.3,
                    duration: 1000
                }))
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexEventPromise',
            plugin: EventPromisePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);