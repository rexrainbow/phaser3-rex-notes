import phaser from 'phaser/src/phaser.js';
import WarpPostFxPipelineController from '../../plugins/shaders/warp/WarpPostFxPipelineController.js'
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
        var postFxPipeline = new WarpPostFxPipelineController(gameObject);

        var gui = new Dat.GUI();
        gui.add(postFxPipeline, 'frequencyX', 0, 100);
        gui.add(postFxPipeline, 'frequencyY', 0, 100);
        gui.add(postFxPipeline, 'amplitudeX', 0, 100);
        gui.add(postFxPipeline, 'amplitudeY', 0, 100);
        gui.add(postFxPipeline, 'progressX', 0, 1);
        gui.add(postFxPipeline, 'progressY', 0, 1);
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