import 'phaser';
import InversePipelinePlugin from '../../plugins/inversepipeline-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.video('test', './assets/video/test.mp4', 'canplaythrough', false, true);
    }

    create() {
        var postFxPlugin = this.plugins.get('rexInversePipeline');
        var gameObject = this.add.video(400, 300, 'test')
            .setOrigin(0.5)
            .play();
        var pipeline = postFxPlugin.add(gameObject, { intensity: 0 })

        this.input
            .on('pointerdown', function () {
                pipeline.intensity = 1;
            })
            .on('pointerup', function () {
                pipeline.intensity = 0;
            })
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
            key: 'rexInversePipeline',
            plugin: InversePipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);