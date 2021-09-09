import 'phaser';
import ColorReplacePipelinePlugin from '../../plugins/colorreplacepipeline-plugin'
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
        this.add.image(300, 300, 'mushroom')
        var gameObject = this.add.image(400, 300, 'mushroom')
        var postFxPlugin = this.plugins.get('rexColorReplacePipeline');
        var postFxPipeline = postFxPlugin
            .add(gameObject, {
                originalColor: 0x008800,
                newColor: 0xff0000,
                epsilon: 0.4
            });

        var gui = new Dat.GUI();
        gui.addColor(postFxPipeline, 'originalColor');
        gui.addColor(postFxPipeline, 'newColor');
        gui.add(postFxPipeline, 'epsilon', 0, 1);
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
            key: 'rexColorReplacePipeline',
            plugin: ColorReplacePipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);