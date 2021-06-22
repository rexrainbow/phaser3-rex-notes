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
        var topContainer = this.add.rexContainerLite(400, 300, 100, 100)
            .setScale(2)
            .addLocal(
                this.add.rexContainerLite(100, 0, 100, 100)
                    .setScale(2)
                    .addLocal(
                        this.add.image(0, 20, 'mushroom').setName('child')
                    )
            )

        var child = topContainer.getByName('child', true);
        console.log(child.scaleX, child.scaleY); // Scale= x2(top-container), x2x2(child-container)
        console.log(child.x, child.y); // x=400+(100*2)+(0*4), y=300+(0*2)+(20*4)
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