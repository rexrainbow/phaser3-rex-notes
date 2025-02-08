import phaser from '../../../phaser/src/phaser.js';
import BarrelFilterPlugin from '../../plugins/barrelfilter-plugin.js'
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
        var postFxFilter = this.plugins.get('rexBarrelFilterPlugin').add(camera, {
            radius: 300,
            power: 0.5,
            shrink: true
        });

        this.input.on('pointerdown', function (pointer) {
            postFxFilter.setCenter(pointer.x, pointer.y);
        })

        var gui = new Dat.GUI();
        gui.add(postFxFilter, 'centerX', 0, 800);
        gui.add(postFxFilter, 'centerY', 0, 600);
        gui.add(postFxFilter, 'radius', 0, 800);
        gui.add(postFxFilter, 'power', 0, 2);
        gui.add(postFxFilter, 'intensity', 0, 1);
        gui.add(postFxFilter, 'shrinkMode');
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
            key: 'rexBarrelFilterPlugin',
            plugin: BarrelFilterPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);