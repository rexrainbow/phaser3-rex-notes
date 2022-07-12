import phaser from 'phaser/src/phaser.js';
import PerspectiveImagePlugin from '../../plugins/perspectiveimage-plugin.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.atlas('poker', 'assets/images/poker2/poker.png', 'assets/images/poker2/poker.json');
    }

    create() {
        var faces = [];
        for (var i = 0; i < 10; i++) {
            faces.push(CreatePerspectiveCard(this))
        }
        var carousel = this.add.rexPerspectiveCarousel({
            x: 400, y: 300,

            faces: faces,
            faceSpace: 60,
            // rtl: true
        })

        //this.input.on('pointermove', function (pointer) {
        //
        //    if (!pointer.isDown) {
        //        return;
        //    }
        //
        //    carousel.rotationY += pointer.velocity.x * (1 / 800);
        //});

        carousel
            .setInteractive()
            .on('pointerdown', function (pointer, localX, localY, event) {
                if (localX <= (carousel.width / 2)) {
                    carousel.roll.toLeft();
                } else {
                    carousel.roll.toRight();
                }
            });


        this.add.graphics({
            lineStyle: {
                width: 3,
                color: 0xff0000,
                alpha: 1
            }
        })
            .strokeRect(
                400 - (carousel.width / 2),
                300 - (carousel.height / 2),
                carousel.width,
                carousel.height
            )
            .setDepth(1)
    }

    update() {
    }
}

var CreatePerspectiveCard = function (scene) {
    return scene.rexUI.add.perspectiveCard({
        front: CreateFrontFace(scene),
        back: CreateBackFace(scene),
        face: 'back',

        flip: {
            frontToBack: 'right',
            backToFront: 'left',
            duration: 1000,
            ease: 'Cubic'
        }
    })
        .layout();

}

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
var CreateFrontFace = function (scene) {
    var content = 'Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.';
    return scene.rexUI.add.label({
        orientation: 1,
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY).setStrokeStyle(2, COLOR_LIGHT),
        text: scene.add.text(0, 0, content, {
            wordWrap: { width: 300 - 20 - 20 }
        }),
        icon: scene.rexUI.add.roundRectangle(0, 0, 160, 160, 20, COLOR_DARK),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10, }
    });
}
var CreateBackFace = function (scene) {
    return scene.rexUI.add.label({
        orientation: 1,
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY).setStrokeStyle(2, COLOR_LIGHT),
        icon: scene.rexUI.add.roundRectangle(0, 0, 240, 240, 20, COLOR_DARK),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10, }
    });
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
        }],
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);