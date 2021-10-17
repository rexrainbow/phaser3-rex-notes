import 'phaser';
import FullWindowRectanglePlugin from '../../plugins/fullwindowrectangle-plugin.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.txt;
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        this.add.image(400, 300, 'classroom');
        var rect = this.add.rexFullWindowRectangle(0x0, 0.8);

        this.add.image(400, 400, 'classroom').setScale(0.5);

        var tween = this.tweens.add({
            duration: 2000,
            targets: this.cameras.main,
            scrollX: -300,
            zoom: 0.5,

            repeat: -1,
            yoyo: true
        });

        var gui = new Dat.GUI();
        gui.add(rect, 'alpha', 0, 1);
        gui.addColor(rect, 'tint');
    }

    update() {
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: 0xffffff,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexFullWindowRectangle',
            plugin: FullWindowRectanglePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);