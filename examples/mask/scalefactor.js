import Phaser from 'phaser';

const TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;

const mode = 1; // 0: no scaleFactor, 1: scaleFactor + viewTransform
const MaskWidth = 300;
const MaskHeight = 200;
const MaskScaleFactor = 0.25;


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
        var x = 400;
        var y = 300;

        var image = this.add.image(x, y, 'classroom')

        var maskGameObject = this.add.rectangle(x, y, MaskWidth, MaskHeight, 0xffffff)
            .setVisible(false);

        if (mode === 0) {
            image.enableFilters().filters.external
                .addMask(maskGameObject);

            AddCaption(this, x, 115, 'mode = 0 : no scaleFactor');
        } else {
            var viewTransform = new TransformMatrix().applyITRS(0, 0, 0, MaskScaleFactor, MaskScaleFactor);
            image.enableFilters().filters.external
                .addMask(
                    maskGameObject,
                    false,
                    undefined,
                    viewTransform, // 'world', 'local' are not accaptable
                    MaskScaleFactor
                );


            AddCaption(this, x, 115, 'mode = 1 : scaleFactor + viewTransform');
        }

        this.add.rectangle(x, y, MaskWidth, MaskHeight)
            .setStrokeStyle(2, 0xff3333)
            .setDepth(10);
    }

    update() { }
}

var AddCaption = function (scene, x, y, text) {
    scene.add.text(x, y, text, {
        fontSize: '16px',
        color: '#ffffff'
    }).setOrigin(0.5);
}

var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#11141a',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);
