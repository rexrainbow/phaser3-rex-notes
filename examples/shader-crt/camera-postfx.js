import phaser from 'phaser/src/phaser.js';
import CrtPipelinePlugin from '../../plugins/crtpipeline-plugin.js'
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

        var postFxPlugin = this.plugins.get('rexCrtPipelinePlugin');
        var postFxPipeline = postFxPlugin.add(this.cameras.main, {
            warpX: 0.75,
            warpY: 0.75,
            scanStrength: 0.2,
            scanLineWidth: 1024
        });

        var gui = new Dat.GUI();
        gui.add(postFxPipeline, 'warpX', 0, 1);
        gui.add(postFxPipeline, 'warpY', 0, 1);
        gui.add(postFxPipeline, 'scanStrength', 0, 1);
        gui.add(postFxPipeline, 'scanLineWidth', 0, 4096);
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
    pixelArt: true,
    plugins: {
        global: [{
            key: 'rexCrtPipelinePlugin',
            plugin: CrtPipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);