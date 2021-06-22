import 'phaser';
import EaseMovePlugin from '../../plugins/easemove-plugin.js';
import EventPromisePlugin from '../../plugins/eventpromise-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var WaitComplete = this.plugins.get('rexEventPromise').waitComplete;
        var WaitEvent = this.plugins.get('rexEventPromise').waitEvent;
        var MoveIn = this.plugins.get('rexEaseMove').moveFrom;
        var MoveOutDestroy = this.plugins.get('rexEaseMove').moveToDestroy;

        var print = this.add.text(0, 580, '');
        var scene = this;
        var dot = this.add.circle(400, 300, 20, 0xffffff);
        WaitComplete(MoveIn(dot, 1500, '-=400', undefined, 'Bounce'))
            .then(function () {
                print.text = 'Click to move-out'
                return WaitEvent(scene.input, 'pointerdown');
            })
            .then(function () {
                return WaitComplete(MoveOutDestroy(dot, 1500, '+=400', undefined));
            })
            .then(function () {
                print.text = 'Click to restart scene'
                return WaitEvent(scene.input, 'pointerdown');
            })
            .then(function () {
                scene.scene.restart();
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
        global: [
            {
                key: 'rexEaseMove',
                plugin: EaseMovePlugin,
                start: true
            },
            {
                key: 'rexEventPromise',
                plugin: EventPromisePlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);