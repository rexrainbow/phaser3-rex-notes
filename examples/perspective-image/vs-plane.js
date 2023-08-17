import phaser from 'phaser/src/phaser.js';
import PerspectiveImagePlugin from '../../plugins/perspectiveimage-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('card', 'assets/images/card2.png');
    }

    create() {
        var image = this.add.image(150, 300, 'card').setScale(0.5);
        var plane = this.add.plane(400, 300, 'card').setScale(0.5)
        //plane.projectionMatrix.translateXYZ(0, 2, 0) .rotateX(Phaser.Math.DegToRad(-45));

        var perspectiveImage = this.add.rexPerspectiveImage(650, 300, 'card').setScale(0.5);
        //perspectiveImage.projectionMatrix.translateXYZ(0, 2, 0) .rotateX(Phaser.Math.DegToRad(-45));${}

        console.log(`Image size=${image.width} x ${image.height}`)
        console.log(`Plane size=${plane.width} x ${plane.height}`)
        console.log(`PerspectiveImage size=${perspectiveImage.width} x ${perspectiveImage.height}`)

        debugger
    }

    update() {
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
    backgroundColor: 0x33333,
    plugins: {
        global: [{
            key: 'rexPerspectiveImage',
            plugin: PerspectiveImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);