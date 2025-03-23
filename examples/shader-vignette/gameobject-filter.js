import phaser from '../../../phaser/src/phaser.js';
import VignetteFilterPlugin from '../../plugins/vignettefilter-plugin.js';
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

        var controller = this.plugins.get('rexVignetteFilter').add(gameObject, {
        })

        var gui = new Dat.GUI();
        gui.add(controller, 'x', 0, 1);
        gui.add(controller, 'y', 0, 1);
        gui.add(controller, 'radius', 0, 1);
        gui.add(controller, 'strength', 0, 1);
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
            key: 'rexVignetteFilter',
            plugin: VignetteFilterPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);