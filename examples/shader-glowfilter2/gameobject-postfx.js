import 'phaser';
import GlowFilterPipelinePlugin from '../../plugins/glowfilter2pipeline-plugin.js'
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var gameObject = this.add.image(400, 300, 'mushroom')

        var postFxPlugin = this.plugins.get('rexGlowFilterPipeline');
        var postFxPipeline = postFxPlugin
            .add(gameObject, {
                distance: 15,

                // outerStrength: 8,
                // innerStrength: 2,
                glowColor: 0xff0000,
            });

        var gui = new Dat.GUI();
        gui.add(postFxPipeline, 'outerStrength', 0, 30);
        gui.add(postFxPipeline, 'innerStrength', 0, 10);
        gui.addColor(postFxPipeline, 'glowColor');
        gui.add(postFxPipeline, 'knockout');

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
            key: 'rexGlowFilterPipeline',
            plugin: GlowFilterPipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);