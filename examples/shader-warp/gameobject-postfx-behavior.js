import phaser from 'phaser/src/phaser.js';
import WarpPipelineBehavior from '../../plugins/warppipelinebehavior.js'
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
        var behavior = new WarpPipelineBehavior(gameObject);
        var postFxPipeline = behavior.getPipeline();

        var gui = new Dat.GUI();
        gui.add(postFxPipeline, 'frequencyX', 0, 100);
        gui.add(postFxPipeline, 'frequencyY', 0, 100);
        gui.add(postFxPipeline, 'amplitudeX', 0, 100);
        gui.add(postFxPipeline, 'amplitudeY', 0, 100);
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