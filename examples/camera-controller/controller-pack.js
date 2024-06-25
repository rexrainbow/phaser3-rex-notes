import phaser from 'phaser/src/phaser.js';
import CameraControllerPlugin from '../../plugins/cameracontroller-plugin.js';

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

        var controller = this.plugins.get('rexCameraController').add(this, {
            // camera: this.cameras.main,
            inputTarget: (bg) ? bg : this,
        });

        // controller.toggleEnable().toggleEnable()
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
    scene: Demo,
    plugins: {
        global: [
            {
                key: 'rexCameraController',
                plugin: CameraControllerPlugin,
                start: true
            },
        ]
    }
};

var game = new Phaser.Game(config);