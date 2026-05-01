import Phaser from 'phaser';
import TransitionImagePlugin from '../../plugins/transitionimage-plugin';
import SplitFilterPlugin from '../../plugins/splitfilter-plugin.js';

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
    var splitController;
    transitionImage.transit({
        key: key, frame: frame,

        duration: 2000, ease: 'Linear', dir: 'out', mask: true,

        onStart: function (parent, currentImage, nextImage, t) {
            splitController = currentImage
                .enableFilters()
                .filters.internal.addRexSplit();
        },
        onProgress: function (parent, currentImage, nextImage, t) {
            splitController
                .setSplit(currentImage.width / 2, currentImage.height / 2)
                .setSplittedWidth(currentImage.width * t)
                .setSplittedHeight(currentImage.height * t)
                .setAngle(180 * t)
        },
        onComplete: function (parent, currentImage, nextImage, t) {
            currentImage.filters.internal.remove(splitController);
            splitController = null;
        },
    })
    return transitionImage;
}

var Aggregate = function (transitionImage, key, frame) {
    var splitController;
    transitionImage.transit({
        key: key, frame: frame,

        duration: 2000, ease: 'Cubic', dir: 'in', mask: true,

        onStart: function (parent, currentImage, nextImage, t) {
            splitController = nextImage
                .enableFilters()
                .filters.internal.addRexSplit();
        },
        onProgress: function (parent, currentImage, nextImage, t) {
            splitController
                .setSplit(nextImage.width / 2, nextImage.height / 2)
                .setSplittedWidth(nextImage.width * (1 - t))
                .setSplittedHeight(nextImage.height * (1 - t))
                .setAngle(180 * (1 - t))
        },
        onComplete: function (parent, currentImage, nextImage, t) {
            nextImage.filters.internal.remove(splitController);
            splitController = null;
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
                key: 'rexSplitFilter',
                plugin: SplitFilterPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);