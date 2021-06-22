import 'phaser';
import HslAdjustPipelinePlugin from '../../plugins/hsladjustpipeline-plugin.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

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
        for (var i = 0; i < 100; i++) {
            this.add.circle(0, 0, Between(5, 30), Between(0, 0x1000000))
                .setRandomPosition(100, 100, 600, 400)
                .setAlpha(Math.random());
        }

        var postFxPlugin = this.plugins.get('rexHslAdjustPipeline');
        var customPipeline = postFxPlugin.add(this.cameras.main);

        var gui = new Dat.GUI();
        gui.add(customPipeline, 'hueRotate', 0, 1);
        gui.add(customPipeline, 'satAdjust', 0);
        gui.add(customPipeline, 'lumAdjust', 0, 1);
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