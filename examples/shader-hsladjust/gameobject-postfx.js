import phaser from 'phaser/src/phaser.js';
import HslAdjustPipelinePlugin from '../../plugins/hsladjustpipeline-plugin.js';
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
        var gameObject = this.add.image(400, 300, 'classroom');
        var pipeline = this.plugins.get('rexHslAdjustPipeline').add(gameObject);
        pipeline.setHueRotate(0.5);

        var gui = new Dat.GUI();
        gui.add(pipeline, 'hueRotate', 0, 1);
        gui.add(pipeline, 'satAdjust', 0);
        gui.add(pipeline, 'lumAdjust', 0, 1);
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
    plugins: {
        global: [{
            key: 'rexHslAdjustPipeline',
            plugin: HslAdjustPipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);