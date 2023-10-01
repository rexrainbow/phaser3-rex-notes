import phaser from 'phaser/src/phaser.js';
import GameObjectShellPlugin from '../../templates/gameobjectshell/gameobjectshell-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.atlas('icons', 'assets/images/icons.png', 'assets/images/icons.json');
    }

    create() {
        var shell = this.rexGameObjectShell.add.shell({
            extraProperties: [
                {
                    bindingKey: 'tint',
                    view: 'color'
                }
            ],
        });

        var frameNames = this.sys.textures.get('icons').getFrameNames();
        var gameObjects = [];
        for (var i = 0; i < 10; i++) {
            let gameObject = this.make.image({
                key: 'icons',
                frame: frameNames,

                x: { randFloat: [0, 800] },
                y: { randFloat: [0, 600] },
                scale: {
                    x: { randFloat: [0.5, 2] },
                    y: { randFloat: [0.5, 2] },
                },
                angle: { randFloat: [0, 360] },
            })

            Object.defineProperty(gameObject, 'tint', {
                get: function () {
                    return this.tintTopLeft;
                },

                set: function (value) {
                    this.setTint(value, value, value, value);
                }
            });

            gameObjects.push(gameObject);
        }

        shell.addToMonitorLayer(gameObjects);
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
        scene: [{
            key: 'rexGameObjectShell',
            plugin: GameObjectShellPlugin,
            mapping: 'rexGameObjectShell'
        }]
    }
};

var game = new Phaser.Game(config);