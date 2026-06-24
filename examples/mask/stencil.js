import Phaser from '../../../phaser/src/phaser.js';

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
        var Scroll = true;
        var ApplyMask = true;

        var x = 400;
        var y = 300;

        if (Scroll) {
            this.cameras.main.setScroll(1000, 1000)
            x = 1400;
            y = 1300;
        }

        var image = this.add.image(0, 0, 'classroom')

        var children = [];
        var stencil;

        if (ApplyMask) {
            var maskGameObject = this.add.circle(0, 0, 300, 0x330000);

            stencil = this.add.stencil(0, 0, maskGameObject, {
                stencilInvert: true
            });

            children.push(stencil);
        }
    
        children.push(image);

        if (ApplyMask) {
            children.push(this.add.stencilreference(stencil, {
                stencilInvert: true,
                stencilLayerMode: 'subtractLayer'
            }));
        }

        /*
        render list:
          stencil <- maskGameObject(circle)
          image
          stencilreference <- subtract stencil
        */
        var container = this.add.container(x, y, children);

        container.add(this.add.rectangle(-200, -200, 100, 100, 0x330000))
    }

    update() { }
}

var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: 0x333333,
    stencil: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);
