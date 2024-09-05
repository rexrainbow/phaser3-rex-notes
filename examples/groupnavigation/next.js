import phaser from 'phaser/src/phaser.js';
import GroupNavigatorPlugin from '../../plugins/groupnavigator-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var gameObjects = [
            this.add.rectangle(200, 300, 100, 100, 0x333333),
            this.add.rectangle(400, 300, 100, 100, 0x333333),
            this.add.rectangle(600, 300, 100, 100, 0x333333),
        ]

        var navigator = this.plugins.get('rexGroupNavigator').add({
            targets: gameObjects,
        })
            .on('blur', function (gameObjects) {
                gameObjects.setStrokeStyle();
            })
            .on('focus', function (gameObjects) {
                gameObjects.setStrokeStyle(2, 0xff0000);
            })
            .next()

        this.input.keyboard.on('keydown-TAB', function (event) {
            navigator.next();
            event.preventDefault();
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
            key: 'rexGroupNavigator',
            plugin: GroupNavigatorPlugin,
            start: true
        },
        ]
    }
};

var game = new Phaser.Game(config);