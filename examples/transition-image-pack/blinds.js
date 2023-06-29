import phaser from 'phaser/src/phaser.js';
import TransitionImagePackPlugin from '../../templates/transitionimagepack/transitionimagepack-plugin.js';

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
        var print = this.add.text(0, 580, '').setDepth(1);
        var image = this.add.rexTransitionImagePack(400, 300, 'classroom')
            .on('complete', function () {
                console.log('complete')
            })

        var transitionModes = [
            'blinds', 'squares'
        ];
        var idx = 0;
        this.input.on('pointerdown', function () {
            var nextKey = (image.texture.key === 'classroom') ? 'road' : 'classroom';
            var mode = transitionModes[idx];
            idx = (idx + 1) % (transitionModes.length);

            image.transit(nextKey, undefined, mode);
            print.text = mode;
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
            key: 'rexTransitionImagePack',
            plugin: TransitionImagePackPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);