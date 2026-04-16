import phaser from '../../../phaser/src/phaser.js';
import TransitionImagePlugin from '../../plugins/transitionimage-plugin';
import DisolveFilterPlugin from '../../plugins/dissolvefilter-plugin.js';

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
                Dissolve(image, 'road');
            } else {
                Dissolve(image, 'classroom');
            }

        })

    }

    update() { }
}

var Dissolve = function (transitionImage, key, frame) {
    var dissolveController;
    transitionImage.transit({
        key: key, frame: frame,

        duration: 2000, ease: 'Quad', dir: 'out',

        onStart: function (parent, currentImage, nextImage, t) {
            dissolveController = currentImage
                .enableFilters()
                .filters.internal.addRexDissolve();
        },
        onProgress: function (parent, currentImage, nextImage, t) {
            dissolveController.setProgress(t)
        },
        onComplete: function (parent, currentImage, nextImage, t) {
            currentImage.filters.internal.remove(dissolveController);
            dissolveController = null;
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
                key: 'rexDisolveFilter',
                plugin: DisolveFilterPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);