import phaser from 'phaser/src/phaser.js';
import QuadImagePlugin from '../../plugins/quadimage-plugin.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('card2', 'assets/images/card2.png');
    }

    create() {
        var image = this.add.rexSkewImage(100, 100, 'card2').setSkewDeg(30, 10);
        this.add.image(100, 100, 'card2').setAlpha(0.2);

        var gui = new Dat.GUI();
        gui.add(image, 'skewXDeg', -90, 90);
        gui.add(image, 'skewYDeg', -90, 90);

        // Test with camera scroll
        this.cameras.main.setScroll(-800, -400);
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    backgroundColor: 0x33333,
    plugins: {
        global: [{
            key: 'rexQuadImage',
            plugin: QuadImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);