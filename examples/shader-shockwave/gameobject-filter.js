import phaser from '../../../phaser/src/phaser.js';
import ShockwaveFilterPlugin from '../../plugins/shockwavefilter-plugin.js'
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

        var controller = this.plugins.get('rexShockwaveFilter').add(gameObject, {
            waveRadius: 200
        })

        this.input.on('pointerdown', function (pointer) {
            controller.setCenter(pointer.x, pointer.y);
        })

        var gui = new Dat.GUI();
        gui.add(controller, 'waveRadius', 0, 600);
        gui.add(controller, 'waveWidth', 5, 100);
        // gui.add(postFxFilter, 'powBaseScale', 0, 5);
        // gui.add(postFxFilter, 'powExponent', 0, 5);
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
            key: 'rexShockwaveFilter',
            plugin: ShockwaveFilterPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);