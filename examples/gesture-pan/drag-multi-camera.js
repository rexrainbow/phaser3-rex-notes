import phaser from 'phaser/src/phaser.js';
import GesturesPlugin from '../../plugins/gestures-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        this.input.addPointer(9);

        // Attach bg to main camera, without camera scrolling
        var mainCamera = this.cameras.main;
        mainCamera.name = 'BG'

        var bg = this.add.rectangle(400, 300, 800, 600, 0x333333)
            .setInteractive()
        bg.cameraFilter = 0xffffffff ^ mainCamera.id;


        // Attach gameObject to GO camera, with camera scrolling
        var scrollX = 300,
            scrollY = 300;
        var camera = this.cameras.add();
        camera.scrollX = scrollX;
        camera.scrollY = scrollY;
        camera.zoom = 1.5
        camera.name = 'GO';

        var x = 400 + scrollX,
            y = 300 + scrollY;
        var gameObject = this.add.circle(x, y, 20, 0xff0000)
        gameObject.cameraFilter = 0xffffffff ^ camera.id;

        this.rexGestures.add.pan(gameObject)
            .on('pan', function (pan) {
                pan.gameObject.x += pan.dWorldX;
                pan.gameObject.y += pan.dWorldY;
            });
    }

    update(time, delta) {
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