import phaser from '../../../phaser/src/phaser.js';
import BloomFilterPlugin from '../../plugins/bloomfilter-plugin.js';
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

        var controller = this.plugins.get('rexBloomFilter').add(gameObject, {
        })

        var gui = new Dat.GUI();
        gui.add(controller, 'offsetX', 0, 10);
        gui.add(controller, 'offsetY', 0, 10);
        gui.add(controller, 'blurStrength', 0, 1);
        gui.addColor(controller, 'color');
        gui.add(controller, 'strength', 0, 1);
        gui.add(controller, 'steps', [4, 5, 6, 7, 8]);
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
            key: 'rexBloomFilter',
            plugin: BloomFilterPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);