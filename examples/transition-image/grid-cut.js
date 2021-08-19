import 'phaser';
import TransitionImagePlugin from '../../plugins/transitionimage-plugin';
import GridCutImagePlugin from '../../plugins/gridcutimage-plugin';

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
            image.stop();
            var currentKey = image.texture.key;
            if (currentKey === 'classroom') {
                CellOut(image, 'road', '__BASE');
            } else {
                CellIn(image, 'classroom', '__BASE');
            }

        })

    }

    update() { }
}

const Random = Phaser.Math.FloatBetween;
var DelayMax = 0.5, ProgressT = 1 - DelayMax;
const CubicEase = Phaser.Tweens.Builders.GetEaseFunction('Cubic');

var CellOut = function (transitionImage, key, frame) {
    var scene = transitionImage.scene;

    transitionImage.transit({
        key: key, frame: frame,

        duration: 2000, ease: 'Linear', dir: 'out',

        onStart: function (parent, currentImage, nextImage, t) {
            var cellImages = scene.plugins.get('rexGridCutImage').gridCut(currentImage, 20, 15, {
                objectPool: transitionImage.cellImagePool
            })
            if (!transitionImage.cellImagePool) {
                parent.addMultiple(cellImages);
            }
            currentImage.setVisible(false);

            for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
                parent.setChildLocalVisible(cellImages[i], true);
                cellImages[i].setData('delay', Random(0, DelayMax));
            }

            transitionImage.cellImages = cellImages;
        },
        onProgress: function (parent, currentImage, nextImage, t) {
            var cellImages = transitionImage.cellImages;
            for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
                var delay = cellImages[i].getData('delay');
                var alpha;
                if (t > delay) {
                    var cellT = t - delay;
                    if (cellT > ProgressT) {
                        alpha = 0;
                    } else {
                        alpha = 1 - (cellT / ProgressT);
                    }
                } else {
                    alpha = 1;
                }
                parent.setChildLocalAlpha(cellImages[i], alpha);
            }
        },
        onComplete: function (parent, currentImage, nextImage, t) {
            var cellImages = transitionImage.cellImages;
            if (cellImages) {
                for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
                    parent
                        .setChildLocalAlpha(cellImages[i], 1)
                        .setChildLocalVisible(cellImages[i], false);
                }
                transitionImage.cellImagePool = transitionImage.cellImages;
                transitionImage.cellImages = undefined;
            }
        },
    })
    return transitionImage;
}

var CellIn = function (transitionImage, key, frame) {
    var scene = transitionImage.scene;

    transitionImage.transit({
        key: key, frame: frame,

        duration: 2000, ease: 'Linear', dir: 'in',

        onStart: function (parent, currentImage, nextImage, t) {
            var cellImages = scene.plugins.get('rexGridCutImage').gridCut(nextImage, 20, 15, {
                objectPool: transitionImage.cellImagePool
            });
            if (!transitionImage.cellImagePool) {
                parent.addMultiple(cellImages);
            }
            nextImage.setVisible(false);

            for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
                parent.setChildLocalVisible(cellImages[i], true);
                cellImages[i].setData('delay', Random(0, DelayMax))
            }

            transitionImage.cellImages = cellImages;
        },
        onProgress: function (parent, currentImage, nextImage, t) {
            var cellImages = transitionImage.cellImages;
            for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
                var delay = cellImages[i].getData('delay');
                var scale;
                if (t > delay) {
                    var cellT = t - delay;
                    if (cellT > ProgressT) {
                        scale = 1;
                    } else {
                        scale = CubicEase(cellT / ProgressT);
                    }
                } else {
                    scale = 0;
                }
                parent.setChildLocalScale(cellImages[i], scale);
            }
        },
        onComplete: function (parent, currentImage, nextImage, t) {
            var cellImages = transitionImage.cellImages;
            if (cellImages) {
                for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
                    parent
                        .setChildLocalScale(cellImages[i], 1)
                        .setChildLocalVisible(cellImages[i], false);
                }
                transitionImage.cellImagePool = transitionImage.cellImages;
                transitionImage.cellImages = undefined;
            }
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
                key: 'rexGridCutImage',
                plugin: GridCutImagePlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);