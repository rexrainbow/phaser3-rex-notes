import phaser from 'phaser/src/phaser.js';
import ModalPlugin from '../../plugins/modal-plugin.js';

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
        this.add.image(400, 300, 'classroom');

        var button = this.add.rectangle(400, 300, 100, 100, 0xffffff)
            .on('destroy', function () {
                console.log('Button destroy')
            })
        this.plugins.get('rexModal').add(button, {
            manualClose: false,
            duration: {
                in: 1000,
                hold: 1000,
                out: 1000
            },
            anyTouchClose: true,

            transitIn: function (gameObject, duration) {
                var scene = gameObject.scene;
                scene.tweens.add({
                    targets: gameObject,
                    duration: duration,
                    y: { start: -100, to: gameObject.y }
                })
            },

            transitOut: function (gameObject, duration) {
                var scene = gameObject.scene;
                scene.tweens.add({
                    targets: gameObject,
                    duration: duration,
                    y: { start: gameObject.y, to: 700 },
                })
            }
        })
            .on('open', function () {
                console.log('Modal open')
            })
            .on('close', function () {
                console.log('Modal close')
            })

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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexModal',
            plugin: ModalPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);