import 'phaser';
import DropShadowPipelinePlugin from '../../plugins/dropshadowpipeline-plugin.js'
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

        var postFxPlugin = this.plugins.get('rexDropShadowPipeline');
        var postFxPipeline = postFxPlugin
            .add(gameObject, {
                distance: 5,
                angle: 45,

                shadowColor: 0xff0000,
                alpha: 0.5
            });

        var gui = new Dat.GUI();
        gui.add(postFxPipeline, 'distance', 0, 30);
        gui.add(postFxPipeline, 'angle', -360, 360);
        gui.addColor(postFxPipeline, 'shadowColor');
        gui.add(postFxPipeline, 'alpha', 0, 1);
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
            key: 'rexDropShadowPipeline',
            plugin: DropShadowPipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);