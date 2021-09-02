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
                CustomMaskOut(image, 'road');
            } else {
                CustomMaskIn(image, 'classroom');
            }

        })

    }

    update() { }
}

var CustomMaskOut = function (transitionImage, key, frame) {
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

var CustomMaskIn = function (transitionImage, key, frame) {
    transitionImage.transit({
        key: key, frame: frame,

        duration: 3000, ease: 'Linear', dir: 'in',

        onStart: function (parent, currentImage, nextImage, t) {
            parent.setNextImageMaskEnable(true);
            parent.maskGameObject.setValue(1-t);
        },
        onProgress: function (parent, currentImage, nextImage, t) {
            parent.maskGameObject.setValue(1-t);
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
            { name: 'pie', type: 'arc' },
        ],
        update: function () {            
            var radius = Math.max(this.width, this.height) * 2;
            var deltaAngle = 90 * this.value;

            this.getShape('pie')
                .fillStyle(0xffffff)
                .setCenterPosition(this.centerX, 0)
                .setRadius(radius)
                .setAngle(90 - deltaAngle, 90 + deltaAngle)
                .setPie();

        },
    })
        .setVisible(false)
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