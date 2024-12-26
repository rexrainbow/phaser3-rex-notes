import phaser from '../../../phaser/src/phaser.js';
import { CrtFilter, CrtController } from '../../plugins/crtfilter.js';
import CrtFilterPlugin from '../../plugins/crtfilter-plugin.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');

        if (!this.renderer.renderNodes.hasNode(CrtFilter.FilterName)) {
            this.renderer.renderNodes.addNodeConstructor(CrtFilter.FilterName, CrtFilter);
        }
    }

    create() {
        var gameObject = this.add.image(400, 300, 'classroom');

        var controller = this.plugins.get('rexCrtFilter').add(gameObject, {
            warpX: 0.75,
            warpY: 0.75,
            scanLineStrength: 0.2,
            scanLineWidth: 1024
        })

        var gui = new Dat.GUI();
        gui.add(controller, 'warpX', 0, 1);
        gui.add(controller, 'warpY', 0, 1);
        gui.add(controller, 'scanLineStrength', 0, 1);
        gui.add(controller, 'scanLineWidth', 0, 4096);
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
    pixelArt: true,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexCrtFilter',
            plugin: CrtFilterPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);