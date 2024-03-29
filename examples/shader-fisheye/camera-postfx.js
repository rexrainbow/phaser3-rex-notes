import phaser from 'phaser/src/phaser.js';
import FishEyePipelinePlugin from '../../plugins/fisheyepipeline-plugin'
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

        var postFxPlugin = this.plugins.get('rexFishEyePipelinePlugin');
        var postFxPipeline = postFxPlugin.add(this.cameras.main, {
            radius: 300,
            mode:'asin'
        });

        this.input.on('pointerdown', function (pointer) {
            postFxPipeline.setCenter(pointer.x, pointer.y);
        })

        var gui = new Dat.GUI();
        gui.add(postFxPipeline, 'centerX', 0, 800);
        gui.add(postFxPipeline, 'centerY', 0, 600);
        gui.add(postFxPipeline, 'radius', 0, 800);
        gui.add(postFxPipeline, 'intensity', 0, 1);
        gui.add(postFxPipeline, 'fishEyeMode', 0, 1, 1);
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
            key: 'rexFishEyePipelinePlugin',
            plugin: FishEyePipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);