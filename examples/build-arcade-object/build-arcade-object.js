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
        var gameObject = this.plugins.get('rexBuildArcadeObject')
            .build(this.add.circle(400, 300, 30).setStrokeStyle(1, 0xffffff))
            .setVelocity(100, 100);

        this.time.delayedCall(500, function () {
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