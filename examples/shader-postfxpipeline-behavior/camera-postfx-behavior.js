import phaser from 'phaser/src/phaser.js';
import PostFxPipelineBehavior from '../../plugins/postfxpipelinebehavior.js';
import GrayScalePostFxPipeline from '../../plugins/shaders/grayscale/GrayScalePostFxPipeline.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var gameObject = this.add.image(400, 300, 'classroom')//.setScale(0.75);
        var behavior = new PostFxPipelineBehavior(this.cameras.main, GrayScalePostFxPipeline);
        var postFxPipeline = behavior.getPipeline();
        postFxPipeline.setIntensity(1);

        this.input.once('pointerdown', function () {
            behavior.freePipeline();
        });
    }

    update() {
    }
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
};

var game = new Phaser.Game(config);