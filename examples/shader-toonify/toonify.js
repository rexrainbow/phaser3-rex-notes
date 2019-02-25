import ToonifyPipelinePlugin from '../../plugins/toonifypipeline-plugin.js'
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
        this.add.image(400, 300, 'classroom');

        var customPipeline = this.plugins.get('rexToonifyPipeline').add(this, 'Toonify');
        this.cameras.main.setRenderToTexture(customPipeline);

        var gui = new Dat.GUI();
        gui.add(customPipeline, 'edgeThreshold', 0, 1.1);
        gui.add(customPipeline, 'hueLevels', 0, 10);
        gui.add(customPipeline, 'satLevels', 0, 10);
        gui.add(customPipeline, 'valLevels', 0, 10);
        gui.addColor(customPipeline, 'edgeColor');
    }

    update() {}
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
            key: 'rexToonifyPipeline',
            plugin: ToonifyPipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);