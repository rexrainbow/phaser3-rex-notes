import phaser from '../../../phaser/src/phaser.js';
import CrossStitchingFilterPlugin from '../../plugins/crossstitchingfilter-plugin.js'
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

        /*
        var controller = this.plugins.get('rexCrossStitchingFilterPlugin').add(gameObject, {
            stitchingWidth: 6,
            stitchingHeight: 6,
            brightness: 0
        });
        */
        var controller = gameObject
            .enableFilters()
            .filters.internal.addRexCrossStitching({
                stitchingWidth: 6,
                stitchingHeight: 6,
                brightness: 0
            });

        var gui = new Dat.GUI();
        gui.add(controller, 'brightness', 0, 1);
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
            key: 'rexCrossStitchingFilterPlugin',
            plugin: CrossStitchingFilterPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);