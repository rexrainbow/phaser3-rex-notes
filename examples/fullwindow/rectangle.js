import phaser from 'phaser/src/phaser.js';
import FullWindow from '../../plugins/behaviors/fullwindow/FullWindow.js';

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

        var rect = this.add.rectangle(0, 0, 0, 0).setFillStyle(0x880000, 0.3)
        rect.fullWindow = new FullWindow(rect);

        this.cameras.main.setZoom(1.5);

        var tween = this.tweens.add({
            duration: 2000,
            targets: this.cameras.main,
            scrollX: -300,
            zoom: 0.5,

            repeat: -1,
            yoyo: true
        });

    }

    update() { }
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
};

var game = new Phaser.Game(config);