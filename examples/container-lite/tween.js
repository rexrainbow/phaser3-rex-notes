import phaser from 'phaser/src/phaser.js';
import ContainerLitePlugin from '../../plugins/containerlite-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var centerChild = this.add.rectangle(400, 300, 30, 30, 0x0000ff);
        var roundChild = this.add.circle(400, 200, 10, 0xff0000);
        var localTweenChild = this.add.circle(400, 100, 10, 0x00ff00);
        var parent = this.add.rexContainerLite(400, 300)
            .add(centerChild)
            .add(roundChild)
            .add(localTweenChild)

        this.input.once('pointerdown', function () {
            parent.tweenChild({
                targets: localTweenChild,
                y: '+=200',
                repeat: -1,
                yoyo: true,              
            })
            parent.tween({
                angle: 360,
                duration: 3000,
                repeat: -1
            });
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
            key: 'rexContainerLite',
            plugin: ContainerLitePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);