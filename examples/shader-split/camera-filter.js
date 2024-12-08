import phaser from '../../../phaser/src/phaser.js';
import { SplitFilter, SplitController } from '../../plugins/splitfilter.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');

        if (!this.renderer.renderNodes.hasNode(SplitFilter.FilterName)) {
            this.renderer.renderNodes.addNodeConstructor(SplitFilter.FilterName, SplitFilter);
        }
    }

    create() {
        var gameObject = this.add.image(400, 300, 'classroom').setScale(0.8);

        var filterList = this.cameras.main.filters.internal;
        var controller = filterList.add(
            new SplitController(filterList.camera, {
                width: 20,
                height: 20,
                angle: 30
            })
        )

        this.input.on('pointerdown', function (pointer) {
            controller.setSplit(pointer.x, pointer.y);
        })

        var gui = new Dat.GUI();
        gui.add(controller, 'splitX', 0, 800);
        gui.add(controller, 'splitY', 0, 600);
        gui.add(controller, 'splittedWidth', 0, 800);
        gui.add(controller, 'splittedHeight', 0, 600);
        gui.add(controller, 'angle', 0, 360);
        gui.add(controller, 'shiftEnable');
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
};

var game = new Phaser.Game(config);