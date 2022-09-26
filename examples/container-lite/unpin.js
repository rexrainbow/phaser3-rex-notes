import phaser from 'phaser/src/phaser.js';
import ContainerLitePlugin from '../../plugins/containerlite-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var child = this.add.image(100, 200, 'mushroom');
        var parent = this.add.rexContainerLite(100, 300, 100, 100)
            .pin(child)
            .unpin(child)

        this.tweens.add({
            targets: parent,
            x: '+=300',
            angle: '+=360',
            duration: 6000,
            repeat: -1,
            yoyo: true
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
    plugins: {
        global: [{
            key: 'rexContainerLite',
            plugin: ContainerLitePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);