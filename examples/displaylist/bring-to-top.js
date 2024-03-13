import phaser from 'phaser/src/phaser.js';
import DisplayListMethods from '../../plugins/utils/gameobject/displaylist/DisplayListMethods';

Object.assign(
    Phaser.GameObjects.GameObject.prototype,
    DisplayListMethods
);

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

        this.img;
        this.text;
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var gameObject = this.add.circle(400, 300, 30, 0xff0000);
        var bg = this.add.image(400, 300, 'classroom');

        gameObject.bringToTop();
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