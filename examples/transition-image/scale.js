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
            .on('complete', function () {
                console.log('complete')
            })

        this.input.on('pointerdown', function () {
            var currentKey = image.texture.key;
            if (currentKey === 'classroom') {
                ScaleDown(image, 'road');
            } else {
                ScaleUp(image, 'classroom');
            }

        })

    }

    update() { }
}

var ScaleDown = function (transitionImage, key, frame) {
    transitionImage.transit({
        key: key, frame: frame,

        duration: 500, ease: 'Linear', dir: 'out',

        onStart: function (currentImage, nextImage, t, parent) {
        },
        onProgress: function (currentImage, nextImage, t, parent) {
            currentImage.setScale(1 - t);
        },
        onComplete: function (currentImage, nextImage, t, parent) {
            currentImage.setScale(1);
        },
    })
    return transitionImage;
}

var ScaleUp = function (transitionImage, key, frame) {
    transitionImage.transit({
        key: key, frame: frame,

        duration: 500,  ease: 'Cubic', dir: 'in',

        onStart: function (currentImage, nextImage, t, parent) {
            nextImage.setScale(0);
        },
        onProgress: function (currentImage, nextImage, t, parent) {
            nextImage.setScale(t);
        },
        onComplete: function (currentImage, nextImage, t, parent) {
            nextImage.setScale(1);
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