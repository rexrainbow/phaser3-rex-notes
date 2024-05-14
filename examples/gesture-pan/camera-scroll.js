import phaser from 'phaser/src/phaser.js';
import GesturesPlugin from '../../plugins/gestures-plugin.js';

const RandomBetween = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        DrawSomethings(this);

        var camera = this.cameras.main;
        this.rexGestures.add.pan()
            .on('pan', function (pan) {
                camera.scrollX -= pan.dx;
                camera.scrollY -= pan.dy;
            });
    }
}

const Random = Phaser.Math.Between;
var DrawSomethings = function (scene) {
    for (var i = 0; i < 500; i++) {
        scene.add.circle(
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
    plugins: {
        scene: [{
            key: 'rexGestures',
            plugin: GesturesPlugin,
            mapping: 'rexGestures'
        }]
    }
};

var game = new Phaser.Game(config);