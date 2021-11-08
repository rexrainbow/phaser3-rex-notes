import 'phaser';
import ScaleOuterPlugin from '../../plugins/scaleouter-plugin.js';

class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'game'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        this.add.image(400, 300, 'classroom');

        this.add.rectangle(100, 100, 50, 50, 0xff0000)
            .setInteractive()
            .on('pointerdown', function () {
                console.log('click');
            })
    }

    update() {
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: 0x333333,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.NONE,
    },
    scene: Game,
    plugins: {
        scene: [{
            key: 'rexScaleOuter',
            plugin: ScaleOuterPlugin,
            mapping: 'rexScaleOuter'
        }]
    }
};

var game = new Phaser.Game(config);