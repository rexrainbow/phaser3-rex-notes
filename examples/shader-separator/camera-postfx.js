import 'phaser';
import SeparatorPipelinePlugin from '../../plugins/separatorpipeline-plugin.js'
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

        var postFxPlugin = this.plugins.get('rexSeparatorPipelinePlugin');
        var postFxPipeline = postFxPlugin.add(this.cameras.main, {
            center: true,
            width: 20,
            height: 20
        });

        this.input.on('pointerdown', function (pointer) {
            postFxPipeline.setSeparator(pointer.x, pointer.y);
        })

        var gui = new Dat.GUI();
        gui.add(postFxPipeline, 'separatorX', 0, 800);
        gui.add(postFxPipeline, 'separatorY', 0, 600);
        gui.add(postFxPipeline, 'separatedWidth', 0, 800);
        gui.add(postFxPipeline, 'separatedHeight', 0, 600);
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
            key: 'rexSeparatorPipelinePlugin',
            plugin: SeparatorPipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);