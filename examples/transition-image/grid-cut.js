import 'phaser';
import TransitionImagePlugin from '../../plugins/transitionimage-plugin';

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
                CellOut(image, 'road');
            } else {
                CellIn(image, 'classroom');
            }

        })

    }

    update() { }
}

const Random = Phaser.Math.FloatBetween;
var DelayMax = 0.5, ProgressT = 1 - DelayMax;
const CubicEase = Phaser.Tweens.Builders.GetEaseFunction('Cubic');
const Clamp = Phaser.Math.Clamp;
const Linear = Phaser.Math.Linear;

var CellOut = function (transitionImage, key, frame) {
    if (frame === undefined) {
        frame = '__BASE';
    }

    transitionImage.transit({
        key: key, frame: frame,

        duration: 2000, ease: 'Linear', dir: 'out',

        onStart: function (parent, currentImage, nextImage, t) {
            var cellImages = parent.gridCutCurrentImage(20, 15);
            for (var i = 0, cnt = cellImages.length; i < cnt; i++) {                
                cellImages[i].setData('delay', Random(0, DelayMax));
            }
        },
        onProgress: function (parent, currentImage, nextImage, t) {
            var cellImages = parent.getCellImages();
            for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
                var delay = cellImages[i].getData('delay');
                var cellT = Clamp((t - delay) / ProgressT, 0, 1);
                var alpha = Linear(1, 0, cellT);
                parent.setChildLocalAlpha(cellImages[i], alpha);
            }
        },
        onComplete: function (parent, currentImage, nextImage, t) {
        },
    })
    return transitionImage;
}

var CellIn = function (transitionImage, key, frame) {
    if (frame === undefined) {
        frame = '__BASE';
    }

    transitionImage.transit({
        key: key, frame: frame,

        duration: 2000, ease: 'Linear', dir: 'in',

        onStart: function (parent, currentImage, nextImage, t) {
            var cellImages = parent.gridCutNextImage(20, 15);
            for (var i = 0, cnt = cellImages.length; i < cnt; i++) {                
                cellImages[i].setData('delay', Random(0, DelayMax))
            }
        },
        onProgress: function (parent, currentImage, nextImage, t) {
            var cellImages = parent.getCellImages();
            for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
                var delay = cellImages[i].getData('delay');
                var cellT = Clamp((t - delay) / ProgressT, 0, 1);
                var scale = Linear(0, 1, CubicEase(cellT));
                parent.setChildLocalScale(cellImages[i], scale);
            }
        },
        onComplete: function (parent, currentImage, nextImage, t) {
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
        global: [{
            key: 'rexTransitionImage',
            plugin: TransitionImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);