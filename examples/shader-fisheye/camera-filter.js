import phaser from '../../../phaser/src/phaser.js';
import FishEyeFilterPlugin from '../../plugins/fisheyefilter-plugin'
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

        var camera = this.cameras.main;
        /*
        var controller = this.plugins.get('rexFishEyeFilterPlugin').add(camera, {
            radius: 300,
            mode: 'asin'
        });
        */
        var controller = camera
            .filters.internal.addRexFishEye({
                radius: 300,
                mode: 'asin'
            });

        this.input.on('pointerdown', function (pointer) {
            controller.setCenter(pointer.x, pointer.y);
        })

        var gui = new Dat.GUI();
        gui.add(controller, 'centerX', 0, 800);
        gui.add(controller, 'centerY', 0, 600);
        gui.add(controller, 'radius', 0, 800);
        gui.add(controller, 'intensity', 0, 1);
        gui.add(controller, 'fishEyeMode', 0, 1, 1);
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
            key: 'rexFishEyeFilterPlugin',
            plugin: FishEyeFilterPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);