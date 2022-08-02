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
        var gameObject = this.add.image(400, 300, 'classroom');
        var postFxPipeline = postFxPlugin.add(gameObject, {            
        });

        var gui = new Dat.GUI();
        gui.add(postFxPipeline, 'progress', 0, 1);
        gui.add(postFxPipeline, 'pixelWidth', 1, 100);
        gui.add(postFxPipeline, 'pixelHeight', 1, 100);
        gui.add(postFxPipeline, 'amplitudeX', 0, 100);
        gui.add(postFxPipeline, 'amplitudeY', 0, 100);
        gui.add(postFxPipeline, 'frequenceX', 0, 5);
        gui.add(postFxPipeline, 'frequenceY', 0, 5);
        gui.add(postFxPipeline, 'speedX', 0, 1);
        gui.add(postFxPipeline, 'speedY', 0, 1);
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