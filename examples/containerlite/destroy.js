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
        var topContainer = this.add.rexContainerLite(100, 300, 100, 100)
            .add(
                this.add.rexContainerLite(50, 200)
                    .pin(
                        this.add.image(100, 200, 'mushroom'),
                        { syncRotation: false, syncScale: false, syncAlpha: false }
                    )
            )
            .add(
                this.add.rexContainerLite(150, 300)
                    .add(this.add.image(140, 340, 'mushroom').setAngle(45))
            );

        topContainer.destroy();

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