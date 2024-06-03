import phaser from 'phaser/src/phaser.js';
import ContainerLite from '../../plugins/containerlite.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var bg = this.add.image(400, 300, 'classroom');

        var container = new ContainerLite(this, 400, 300);
        container.add(this.add.circle(400, 300, 50, 0xFF0000))

        var layer = this.add.layer();

        container.addToLayer(layer);

        layer.add(bg);

        container.bringToTop();
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
    scene: Demo
};

var game = new Phaser.Game(config);