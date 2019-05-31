import VideoPlugin from '../../plugins/video-plugin.js';
import GrayScalePipelinePlugin from '../../plugins/grayscalepipeline-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var config = {
            width: 400,
            height: 225,
            src: './assets/video/test.mp4',
            autopPlay: true
        };
        var dom = this.add.rexVideo(200, 300, config);
        var canvas = this.add.rexVideoCanvas(600, 300, config);

        this.input.on('pointerdown', function () {
            if (dom.isPaused) {
                dom.play();
                canvas.play();
            } else {
                dom.pause();
                canvas.pause();
            }
        });

        var customPipeline = this.plugins.get('rexGrayScalePipeline').add(this, 'GrayScale', { intensity: 1 });
        this.cameras.main.setRenderToTexture(customPipeline);

    }

    update() { }
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
    dom: {
        createContainer: true
    },
    scene: Demo,
    plugins: {
        global: [
            {
                key: 'rexVideo',
                plugin: VideoPlugin,
                start: true
            }, {
                key: 'rexGrayScalePipeline',
                plugin: GrayScalePipelinePlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);