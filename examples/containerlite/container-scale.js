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
        var rect = this.add.rectangle(0, 0, 100, 100, 0x008800)
        var containerLite = this.add.rexContainerLite(0, 0, 100, 100);
        containerLite.add(rect);
        containerLite.setScale(2)

        var refRect = this.add.rectangle(0, 0, 200, 200).setStrokeStyle(3, 0xff0000)
        var p3container = this.add.container(400, 300);
        p3container.add(containerLite);        
        p3container.add(refRect);

        p3container.setScale(2);

        // Scale up containerLite and p3container
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