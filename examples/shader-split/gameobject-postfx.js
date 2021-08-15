import 'phaser';
import SplitPipelinePlugin from '../../plugins/splitpipeline-plugin.js'
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

        var postFxPlugin = this.plugins.get('rexSplitPipelinePlugin');
        var postFxPipeline = postFxPlugin.add(gameObject, {
            width: 20,
            height: 20
        });

        // Test mask
        var shape = this.make.graphics();
        shape.fillStyle(0xffffff).fillRect(100, 100, 600, 400);
        var mask = shape.createGeometryMask();
        gameObject.setMask(mask);

        this.input.on('pointerdown', function (pointer) {
            postFxPipeline.setSplit(pointer.x, pointer.y);
        })

        var gui = new Dat.GUI();
        gui.add(postFxPipeline, 'splitX', 0, 800);
        gui.add(postFxPipeline, 'splitY', 0, 600);
        gui.add(postFxPipeline, 'splittedWidth', 0, 800);
        gui.add(postFxPipeline, 'splittedHeight', 0, 600);
        gui.add(postFxPipeline, 'angle', 0, 360);
        gui.add(postFxPipeline, 'shiftEnable');
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
            key: 'rexSplitPipelinePlugin',
            plugin: SplitPipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);