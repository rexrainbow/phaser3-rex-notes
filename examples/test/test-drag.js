import phaser from '../../../phaser3-rex/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {

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
            .setInteractive({ draggable: true })
            .on('drag', function (pointer, dragX, dragY) {
                this.setPosition(dragX, dragY);
                console.log(pointer.camera.name)
                if (pointer.camera.name === 'BG') {
                    debugger
                }
            });

        gameObject.cameraFilter = 0xffffffff ^ camera.id;

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
    scene: Demo
};

var game = new Phaser.Game(config);