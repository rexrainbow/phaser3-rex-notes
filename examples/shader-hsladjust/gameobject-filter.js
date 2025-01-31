import phaser from '../../../phaser/src/phaser.js';
import HslAdjustFilterPlugin from '../../plugins/hsladjustfilter-plugin.js';
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

        var controller = this.plugins.get('rexHslAdjustFilter').add(gameObject, {
            hueRotate: 0.5,
        })

        var gui = new Dat.GUI();
        gui.add(controller, 'hueRotate', 0, 1);
        gui.add(controller, 'satAdjust', 0);
        gui.add(controller, 'lumAdjust', 0, 1);
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
            key: 'rexHslAdjustFilter',
            plugin: HslAdjustFilterPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);