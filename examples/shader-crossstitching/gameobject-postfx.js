import 'phaser';
import CrossStitchingPipelinePlugin from '../../plugins/crossstitchingpipeline-plugin.js'
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
        var postFxPlugin = this.plugins.get('rexCrossStitchingPipelinePlugin');
        var gameObject = this.add.image(400, 300, 'classroom');
        var postFxPipeline = postFxPlugin.add(gameObject, {
            stitchingWidth: 6,
            stitchingHeight: 6,
            brightness: 0
        });

        var gui = new Dat.GUI();
        gui.add(postFxPipeline, 'brightness', 0, 1);
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
            key: 'rexCrossStitchingPipelinePlugin',
            plugin: CrossStitchingPipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);