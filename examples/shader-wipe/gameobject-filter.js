import phaser from '../../../phaser/src/phaser.js';
import WipeFilterPlugin from '../../plugins/wipefilter-plugin.js';
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
        var gameObject = this.add.image(400, 300, 'classroom').setScale(0.8)

        var controller = this.plugins.get('rexWipeFilter').add(gameObject, {
        })

        var gui = new Dat.GUI();
        gui.add(controller, 'progress', 0, 1);
        gui.add(controller, 'wipeWidth', 0, 1);
        gui.add(controller, 'direction', [0, 1]);
        gui.add(controller, 'axis', [0, 1]);
        gui.add(controller, 'reveal');
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
            key: 'rexWipeFilter',
            plugin: WipeFilterPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);