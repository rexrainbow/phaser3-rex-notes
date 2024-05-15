import phaser from 'phaser/src/phaser.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

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
        this.add.image(0, 0, 'classroom').setOrigin(0).setAlpha(0.5);

        var camera = this.cameras.main;
        var gui = new Dat.GUI();
        gui.add(camera, 'zoom', 0.1, 3);
        gui.add(camera, 'scrollX', -200, 200);
        gui.add(camera, 'scrollY', -200, 200);
        gui.add(camera, 'rotation', -1.57, 1.57);
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