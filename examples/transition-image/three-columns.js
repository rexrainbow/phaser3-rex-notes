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

var CellOut = function (transitionImage, key, frame) {
    if (frame === undefined) {
        frame = '__BASE';
    }
    var scene = transitionImage.scene;

    transitionImage.transit({
        key: key, frame: frame,

        duration: 2000, ease: 'Cubic', dir: 'out', mask: true,

        onStart: function (parent, currentImage, nextImage, t) {
            parent.gridCutCurrentImage(3, 1);
            parent.setCellImagesMaskEnable();
        },
        onProgress: function (parent, currentImage, nextImage, t) {
            var cellImages = parent.getCellImages();
            var dy = parent.displayHeight * t;
            for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
                var cellImage = cellImages[i];
                var y = parent.y + ((i % 2) ? dy : -dy);
                cellImage.setY(y);
                parent.resetChildPositionState(cellImage);
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
    var scene = transitionImage.scene;

    transitionImage.transit({
        key: key, frame: frame,

        duration: 2000, ease: 'Cubic', dir: 'in', mask: true,

        onStart: function (parent, currentImage, nextImage, t) {
            parent.gridCutCurrentImage(3, 1);
            parent.setCellImagesMaskEnable();
        },
        onProgress: function (parent, currentImage, nextImage, t) {
            var cellImages = parent.getCellImages();
            var dy = parent.displayHeight * t;
            for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
                var cellImage = cellImages[i];
                var y = parent.y + ((i % 2) ? dy : -dy);
                cellImage.setY(y);
                parent.resetChildPositionState(cellImage);
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