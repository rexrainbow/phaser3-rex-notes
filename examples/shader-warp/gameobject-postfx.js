import phaser from 'phaser/src/phaser.js';
import WarpPipelinePlugin from '../../plugins/warppipeline-plugin.js'
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
        var postFxPlugin = this.plugins.get('rexWarpPipelinePlugin');
        var gameObject = this.add.image(400, 300, 'classroom')//.setScale(0.75);
        var postFxPipeline = postFxPlugin.add(gameObject, {
        });

        var gui = new Dat.GUI();
        gui.add(postFxPipeline, 'pixelWidth', 0, 100);
        gui.add(postFxPipeline, 'pixelHeight', 0, 100);
        gui.add(postFxPipeline, 'radiusX', 0, 100);
        gui.add(postFxPipeline, 'radiusY', 0, 100);
        gui.add(postFxPipeline, 'progress', 0, 1);
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
            key: 'rexWarpPipelinePlugin',
            plugin: WarpPipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);