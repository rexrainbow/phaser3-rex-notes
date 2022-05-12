import 'phaser';
import KawaseBlurPipelinePlugin from '../../plugins/kawaseblurpipeline-plugin';
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

        var postFxPlugin = this.plugins.get('rexKawaseBlurPipelinePlugin') as KawaseBlurPipelinePlugin;
        var postFxPipeline = postFxPlugin.add(this.cameras.main, {
            blur: 4,
            quality: 3
        });

        var gui = new Dat.GUI();
        gui.add(postFxPipeline, 'blur', 0, 30);
        gui.add(postFxPipeline, 'pixelWidth', 0, 600);
        gui.add(postFxPipeline, 'pixelHeight', 0, 800);
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
            key: 'rexKawaseBlurPipelinePlugin',
            plugin: KawaseBlurPipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);