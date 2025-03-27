import phaser from '../../../phaser/src/phaser.js';
import WarpFilterPlugin from '../../plugins/warpfilter-plugin.js';
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

        /*
        var controller = this.plugins.get('rexWarpFilter').add(gameObject, {
            speedY: 6
        })
        */

        var controller = gameObject
            .enableFilters()
            .filters.internal.addRexWarp({
                speedY: 6
            })

        var gui = new Dat.GUI();
        gui.add(controller, 'frequencyX', 0, 100);
        gui.add(controller, 'frequencyY', 0, 100);
        gui.add(controller, 'amplitudeX', 0, 100);
        gui.add(controller, 'amplitudeY', 0, 100);
        gui.add(controller, 'speedX', 0, 100);
        gui.add(controller, 'speedY', 0, 100);
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
            key: 'rexWarpFilter',
            plugin: WarpFilterPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);