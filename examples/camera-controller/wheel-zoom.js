import phaser from 'phaser/src/phaser.js';
import MouseWheelZoom from '../../plugins/camera/mousewheelzoom/MouseWheelZoom.js';
import PanScroll from '../../plugins/camera/panscroll/PanScroll.js';
import FullWindowRectangle from '../../plugins/fullwindowrectangle.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var TEST_INPUTTARGET = false;

        var bg;
        if (TEST_INPUTTARGET) {
            bg = new FullWindowRectangle(this);
            bg.setDepth(-1);
            this.add.existing(bg);
        }

        DrawSomethings(this, TEST_INPUTTARGET);

        var pinchZoomController = new MouseWheelZoom(this, {
            // camera: this.cameras.main,
            inputTarget: (bg) ? bg : this,
        });

        var panScrollController = new PanScroll(this, {
            // camera: this.cameras.main,
            inputTarget: (bg) ? bg : this,
        })
    }

    update() {
        var camera = this.cameras.main;
        if (this.prevCameraZoom !== camera.zoom) {
            this.prevCameraZoom = camera.zoom;
            console.log(this.prevCameraZoom);
        }
    }
}

const Random = Phaser.Math.Between;
var DrawSomethings = function (scene, TEST_INPUTTARGET) {
    for (var i = 0; i < 500; i++) {
        let gameObject = scene.add.circle(
            Random(-1000, 1000), Random(-1000, 1000), // x, y
            Random(10, 100), // r
            Random(0, 0xffffff), // color
            0.5 // alpha
        );

        if (TEST_INPUTTARGET) {
            gameObject.setInteractive();
        }
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