import 'phaser';
import HslAdjustPipelinePlugin from '../../plugins/hsladjustpipeline-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        const Between = Phaser.Math.Between;
        var postFxPlugin = this.plugins.get('rexHslAdjustPipeline');
        for (var i = 0; i < 20; i++) {
            let gameObject = this.add.circle(0, 0, Between(10, 30), Between(0, 0x1000000))
                .setRandomPosition(100, 100, 600, 400)

            let pipeline = postFxPlugin.add(gameObject);
            this.tweens.add({
                targets: pipeline,
                hueRotate: 1,
                ease: 'Linear',
                duration: Between(500, 1000),
                repeat: -1,
                yoyo: false
            })
        }
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