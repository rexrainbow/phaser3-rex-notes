import 'phaser';
import TransitionImagePlugin from '../../plugins/transitionimage-plugin';
import DissolvePipelinePlugin from '../../plugins/dissolvepipeline-plugin.js';

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
    var scene = transitionImage.scene;
    var postFxPlugin = scene.plugins.get('rexDissolvePipelinePlugin');

    transitionImage.transit({
        key: key, frame: frame,

        duration: 2000, ease: 'Quad', dir: 'out',

        onStart: function (parent, currentImage, nextImage, t) {
            postFxPlugin.add(currentImage)
        },
        onProgress: function (parent, currentImage, nextImage, t) {
            postFxPlugin.get(currentImage)[0]
                .setProgress(t)
        },
        onComplete: function (parent, currentImage, nextImage, t) {
            postFxPlugin.remove(currentImage)
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
                key: 'rexDissolvePipelinePlugin',
                plugin: DissolvePipelinePlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);