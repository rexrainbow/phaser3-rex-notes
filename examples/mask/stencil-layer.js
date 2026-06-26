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
        var image = this.add.image(400, 300, 'classroom');

        var stencilA = this.add.stencil(0, 0, [], {
            stencilInvert: true
        })
            .add(
                this.add.circle(400 - 150, 300, 200, 0x330000)
            )
            .add(
                this.add.circle(400 + 150, 300, 200, 0x330000)
            )


        var stencilReferenceA = this.add.stencilreference(stencilA, {
            stencilInvert: true,
            stencilLayerMode: 'subtractLayer'
        })
        stencilReferenceA.setAlpha = function () { }

        var mainLayer = this.add.layer([
            stencilA,
            image,
            stencilReferenceA,
        ])

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
