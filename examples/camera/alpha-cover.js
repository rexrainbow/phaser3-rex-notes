import 'phaser';
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
        this.add.image(400, 300, 'classroom');
        var cover = this.add.rectangle(400, 300, 800, 600, 0x0, 0);
        var gui = new Dat.GUI();
        gui.add(cover, 'fillAlpha', 0, 1);
        gui.addColor(cover, 'fillColor');


        this.add.image(400, 400, 'classroom').setScale(0.5);
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
};

var game = new Phaser.Game(config);