import phaser from 'phaser/src/phaser.js';
import GameObjectShellPlugin from '../../templates/gameobjectshell/gameobjectshell-plugin.js';
import TransformController from '../../templates/gameobjectshell/transformcontroller/TransformController';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('logo', 'assets/images/logo.png');
    }

    create() {
        var gameObject = this.add.image(400, 300, 'logo').setAngle(45);

        var controller = this.rexGameObjectShell.add.transformController({
            boundsRectangle: {
                color: 0x555555,
            },

            controlPoint: {
                color: 0x00ff00
            }
        })
            .bind(gameObject);
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