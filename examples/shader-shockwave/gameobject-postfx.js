import 'phaser';
import ShockwavePipelinePlugin from '../../plugins/shockwavepipeline-plugin.js'
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
        var postFxPlugin = this.plugins.get('rexShockwavePipelinePlugin');
        var gameObject = this.add.image(400, 300, 'classroom');
        var postFxPipeline = postFxPlugin.add(gameObject, { waveRadius: 200 });

        this.input.on('pointerdown', function (pointer) {
            postFxPipeline.setCenter(pointer.x, pointer.y);
        })

        var gui = new Dat.GUI();
        gui.add(postFxPipeline, 'waveRadius', 0, 600);
        gui.add(postFxPipeline, 'waveWidth', 5, 100);
        // gui.add(postFxPipeline, 'powBaseScale', 0, 5);
        // gui.add(postFxPipeline, 'powExponent', 0, 5);
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
            key: 'rexShockwavePipelinePlugin',
            plugin: ShockwavePipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);