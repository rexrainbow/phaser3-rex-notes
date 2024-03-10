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
        var parent = this.add.rexContainerLite(400, 300, 200, 200)
            .add(
                this.add.circle(400, 300, 120).setStrokeStyle(2, 0x880000)
            )
            .add(
                this.add.circle(300, 300, 20, 0x880000)
            )
            .add(
                this.add.circle(500, 300, 20, 0x880000)
            )

        this.cameras.main.ignore(parent)
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
            key: 'rexContainerLite',
            plugin: ContainerLitePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);