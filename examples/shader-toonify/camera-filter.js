import phaser from '../../../phaser/src/phaser.js';
import ToonifyFilterPlugin from '../../plugins/toonifyfilter-plugin.js';
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
        this.add.image(400, 300, 'classroom');

        var camera = this.cameras.main;
        /*
        var controller = this.plugins.get('rexToonifyFilter').add(camera, {
        })
        */
        var controller = camera
            .filters.internal.addRexToonify();

        var gui = new Dat.GUI();
        gui.add(controller, 'edgeThreshold', 0, 1.1);
        gui.add(controller, 'hueLevels', 0, 10);
        gui.add(controller, 'satLevels', 0, 10);
        gui.add(controller, 'valLevels', 0, 10);
        gui.addColor(controller, 'edgeColor');
    }

    update() { }
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
            key: 'rexToonifyFilter',
            plugin: ToonifyFilterPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);