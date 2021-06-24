import 'phaser';
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
                this.add.circle(300, 300, 20, 0x880000)
            )
            .add(
                this.add.circle(500, 300, 20, 0x880000)
            )

        parent.changeOrigin(0.5, 0);
        this.add.circle(parent.x, parent.y, 10, 0xffffff);

        this.events.on('update', function (time, delta) {
            parent.angle = (parent.angle + (delta / 10)) % 360;
        });
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