import phaser from '../../../phaser/src/phaser.js';
import SplitFilterPlugin from '../../plugins/splitfilter-plugin.js';
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
        var gameObject = this.add.image(440, 340, 'classroom').setScale(0.8)

        var controller = this.plugins.get('rexSplitFilter').add(gameObject, {
            width: 20,
            height: 20,
            angle: 30
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
    plugins: {
        global: [{
            key: 'rexSplitFilter',
            plugin: SplitFilterPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);