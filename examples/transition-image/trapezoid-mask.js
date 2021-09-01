import 'phaser';
import TransitionImagePlugin from '../../plugins/transitionimage-plugin';
import CustomProgressPlugin from '../../plugins/customprogress-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
        this.load.image('road', 'assets/images/backgrounds/road.png');
    }

    create() {
        var image = this.add.rexTransitionImage({
            x: 400, y: 300,
            key: 'classroom',
            mask: CreateMask(this)
        })
            .setScale(0.5)
            // .setAngle(-30)
            .on('complete', function () {
                console.log('complete')
            })

        this.input.on('pointerdown', function () {
            var currentKey = image.texture.key;
            if (currentKey === 'classroom') {
                CustomMask(image, 'road');
            } else {
                CustomMask(image, 'classroom');
            }

        })

    }

    update() { }
}

var CustomMask = function (transitionImage, key, frame) {
    transitionImage.transit({
        key: key, frame: frame,

        duration: 3000, ease: 'Linear', dir: 'out',

        onStart: function (parent, currentImage, nextImage, t) {
            parent.setCurrentImageMaskEnable(true, true);
            parent.maskGameObject.setValue(t);
        },
        onProgress: function (parent, currentImage, nextImage, t) {
            parent.maskGameObject.setValue(t);
        },
        onComplete: function (parent, currentImage, nextImage, t) {
        },
    })
    return transitionImage;
}

var CreateMask = function (scene) {
    return scene.add.rexCustomProgress({
        type: 'Graphics',
        create: [
            { name: 'trapezoid0', type: 'lines' },
            { name: 'trapezoid1', type: 'lines' },
        ],
        update: function () {            
            var height = this.height * this.value;
            var width0 = this.width * 0.4;
            var width1 = this.width * (0.4 + 0.2 * this.value);

            this.getShape('trapezoid0')
                .fillStyle(0xffffff)
                .startAt(0, this.height)
                .lineTo(width0, this.height)
                .lineTo(width1, this.height - height)
                .lineTo(0, this.height - height)
                .close()

            this.getShape('trapezoid1')
                .fillStyle(0xffffff)
                .startAt(this.width, 0)
                .lineTo(this.width - width0, 0)
                .lineTo(this.width - width1, height)
                .lineTo(this.width, height)
                .close()
        },
    })
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
                key: 'rexTransitionImage',
                plugin: TransitionImagePlugin,
                start: true
            },
            {
                key: 'CustomProgressPlugin',
                plugin: CustomProgressPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);