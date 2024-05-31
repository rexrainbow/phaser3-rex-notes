import phaser from 'phaser/src/phaser.js';
import BuildArcadeObjectPlugin from '../../plugins/buildarcadeobject-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.print;
    }

    preload() { }

    create() {
        this.plugins.get('rexBuildArcadeObject').injectMethodsToRootClass();

        var gameObject = this.add.circle(400, 300, 30).setStrokeStyle(1, 0xffffff)
        this.physics.add.existing(gameObject);

        gameObject.setVelocity(100, 100);

        this.time.delayedCall(1000, function () {
            gameObject.disableBody(true, true);
        });
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
    physics: {
        default: 'arcade',
    },
    plugins: {
        global: [{
            key: 'rexBuildArcadeObject',
            plugin: BuildArcadeObjectPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);