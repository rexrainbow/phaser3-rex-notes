import 'phaser';
import KawaseBlurPipelinePlugin from '../../plugins/kawaseblurpipeline-plugin';

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

        var postFxPlugin = this.plugins.get('rexKawaseBlurPipelinePlugin');
        var postFxPipelines = postFxPlugin.add(this.cameras.main, {
            blur: 4,
            quality: 3
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
    plugins: {
        global: [{
            key: 'rexKawaseBlurPipelinePlugin',
            plugin: KawaseBlurPipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);