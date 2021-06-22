import 'phaser';
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
        var topContainer = this.add.rexContainerLite(400, 300)
            .add(
                this.add.rexContainerLite(350, 300)
                    .add(this.add.circle(300, 300, 30, 0xff0000).setName('red'))
            )
            .add(
                this.add.rexContainerLite(450, 300)
                    .add(this.add.circle(500, 300, 30, 0x00ff00).setName('green'))
            );

        var recursive = true;
        var circle = topContainer.getByName('red', recursive);
        if (circle) {
            circle.setStrokeStyle(2, 0xffffff);
        }
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