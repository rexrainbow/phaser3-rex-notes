import phaser from 'phaser/src/phaser.js';
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
            .addTransitionMode('slideAwayRight', {
                duration: 1000, ease: 'Linear', dir: 'out', mask: true,

                onStart: function (parent, currentImage, nextImage, t) {
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    var x = currentImage.width * (t);
                    parent.setChildLocalPosition(currentImage, x, 0);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.setChildLocalPosition(currentImage, 0, 0);
                },
            })
            .addTransitionMode('slideAwayLeft', {
                duration: 1000, ease: 'Linear', dir: 'out', mask: true,

                onStart: function (parent, currentImage, nextImage, t) {
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    var x = currentImage.width * (-t);
                    parent.setChildLocalPosition(currentImage, x, 0);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.setChildLocalPosition(currentImage, 0, 0);
                },
            })
            .addTransitionMode('slideLeft', {
                duration: 1000, ease: 'Cubic', dir: 'in', mask: true,

                onStart: function (parent, currentImage, nextImage, t) {
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    var x = nextImage.width * (t - 1);
                    parent.setChildLocalPosition(nextImage, x, 0);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.setChildLocalPosition(nextImage, 0, 0);
                },
            })
            .addTransitionMode('slideRight', {
                duration: 1000, ease: 'Cubic', dir: 'in', mask: true,

                onStart: function (parent, currentImage, nextImage, t) {
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    var x = nextImage.width * (1 - t);
                    parent.setChildLocalPosition(nextImage, x, 0);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.setChildLocalPosition(nextImage, 0, 0);
                },
            })
            .on('complete', function () {
                console.log('complete')
            })


        var transitionModes = ['slideAwayRight', 'slideAwayLeft', 'slideRight', 'slideLeft'];
        this.input.on('pointerdown', function () {
            var nextKey = (image.texture.key === 'classroom') ? 'road' : 'classroom';
            image.transit(nextKey, undefined, Phaser.Utils.Array.GetRandom(transitionModes));
        })

    }

    update() { }
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