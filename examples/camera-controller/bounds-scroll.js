import phaser from 'phaser/src/phaser.js';
import BoundsScroll from '../../plugins/camera/boundsscroll/BoundsScroll.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        DrawSomethings(this);

        var controller = new BoundsScroll(this, {
            // camera: this.cameras.main,
        });

    }
}

const Random = Phaser.Math.Between;
var DrawSomethings = function (scene) {
    for (var i = 0; i < 500; i++) {
        let gameObject = scene.add.circle(
            Random(-1000, 1000), Random(-1000, 1000), // x, y
            Random(10, 100), // r
            Random(0, 0xffffff), // color
            0.5 // alpha
        );
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
};

var game = new Phaser.Game(config);