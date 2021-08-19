import 'phaser';
import TransitionImagePlugin from '../../plugins/transitionimage-plugin';
import SplitPipelinePlugin from '../../plugins/splitpipeline-plugin.js'

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
        var image = this.add.rexTransitionImage(400, 300, 'classroom')
            .setScale(0.75)
            .on('complete', function () {
                console.log('complete')
            })

        this.input.on('pointerdown', function () {
            var currentKey = image.texture.key;
            if (currentKey === 'classroom') {
                Split(image, 'road');
            } else {
                Aggregate(image, 'classroom');
            }

        })

    }

    update() { }
}

var Split = function (transitionImage, key, frame) {
    var scene = transitionImage.scene;
    var postFxPlugin = scene.plugins.get('rexSplitPipelinePlugin');

    transitionImage.transit({
        key: key, frame: frame,

        duration: 2000, ease: 'Linear', dir: 'out', mask: true,

        onStart: function (parent, currentImage, nextImage, t) {
            postFxPlugin.add(currentImage)
        },
        onProgress: function (parent, currentImage, nextImage, t) {
            postFxPlugin.get(currentImage)[0]
                .setSplit(currentImage.x, currentImage.y)
                .setSplittedWidth(currentImage.width * t)
                .setSplittedHeight(currentImage.height * t)
                .setAngle(180 * t)
        },
        onComplete: function (parent, currentImage, nextImage, t) {
            postFxPlugin.remove(currentImage)
        },
    })
    return transitionImage;
}

var Aggregate = function (transitionImage, key, frame) {
    var scene = transitionImage.scene;
    var postFxPlugin = scene.plugins.get('rexSplitPipelinePlugin');

    transitionImage.transit({
        key: key, frame: frame,

        duration: 2000, ease: 'Cubic', dir: 'in', mask: true,

        onStart: function (parent, currentImage, nextImage, t) {
            postFxPlugin.add(nextImage)
        },
        onProgress: function (parent, currentImage, nextImage, t) {
            postFxPlugin.get(nextImage)[0]
                .setSplit(nextImage.x, nextImage.y)
                .setSplittedWidth(nextImage.width * (1 - t))
                .setSplittedHeight(nextImage.height * (1 - t))
                .setAngle(180 * (1 - t))
        },
        onComplete: function (parent, currentImage, nextImage, t) {
            postFxPlugin.remove(nextImage)
        },
    })
    return transitionImage;
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
                key: 'rexSplitPipelinePlugin',
                plugin: SplitPipelinePlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);