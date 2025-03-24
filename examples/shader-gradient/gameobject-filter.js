import phaser from '../../../phaser/src/phaser.js';
import GradientFilterPlugin from '../../plugins/gradientfilter-plugin.js';
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

        var controller = this.plugins.get('rexGradientFilter').add(gameObject, {
        })

        var gui = new Dat.GUI();
        gui.add(controller, 'alpha', 0, 1);
        gui.add(controller, 'fromX', 0, 1);
        gui.add(controller, 'fromY', 0, 1);
        gui.add(controller, 'toX', 0, 1);
        gui.add(controller, 'toY', 0, 1);
        gui.addColor(controller, 'color1');
        gui.addColor(controller, 'color2');
        gui.add(controller, 'size', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

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
            key: 'rexGradientFilter',
            plugin: GradientFilterPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);