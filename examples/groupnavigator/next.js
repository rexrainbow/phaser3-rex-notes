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
        var gameObjects = [];
        for (var i = 0; i < 10; i++) {
            var gameObject = this.add.circle(0, 0, 40, 0x333300);

            var focusEnable = Math.random() > 0.3;
            var color = (focusEnable) ? 0x333300 : 0x330000;

            gameObject
                .setFillStyle(color)
                .setData('focusEnable', focusEnable)

            gameObjects.push(gameObject)
        }

        var circle = new Phaser.Geom.Circle(400, 300, 250);
        Phaser.Actions.PlaceOnCircle(gameObjects, circle);

        var navigator = this.plugins.get('rexGroupNavigator').add({
            targets: gameObjects,

            focusEnableDataKey: 'focusEnable',
            // getFocusEnableCallback(gameObject) {
            //     return gameObject.getData('focusEnable')
            // },

        })
            .on('blur', function (gameObjects) {
                gameObjects.setStrokeStyle();
            })
            .on('focus', function (gameObjects) {
                gameObjects.setStrokeStyle(5, 0xff0000);
            })
            .next()

        var OnSelect = function (gameObject) {
            var color = (gameObject.fillColor === 0x333300) ? 0x888800 : 0x333300;
            gameObject.setFillStyle(color);
        }

        this.input.keyboard
            .on('keydown-TAB', function (event) {
                navigator.next();

                event.preventDefault();
            })
            .on('keydown-ENTER', function (event) {
                var gameObject = navigator.getFocusedTarget();
                OnSelect(gameObject);

                event.preventDefault();
            })

        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            let gameObject = gameObjects[i];
            gameObject
                .setInteractive()
                .on('pointerdown', function () {
                    if (!gameObject.getData('focusEnable')) {
                        return;
                    }

                    OnSelect(gameObject);
                    navigator.focus(gameObject);
                })
        }
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