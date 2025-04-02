import phaser from '../../../phaser/src/phaser.js';
import QuadImagePlugin from '../../plugins/quadimage-plugin.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var mushroom = this.make.image({ key: 'mushroom', add: false });
        var numberText = this.make.text({
            text: '7',
            style: { color: 'red', fontSize: '36px', fontFamily: 'serif' },
            add: false
        }).setOrigin(1);

        var image = this.add.rexSkewRenderTexture(400, 300, 150, 200);
        image.rt
            .fill(0x888888)
            .draw(numberText, 150, 200)
            .draw(mushroom, 75, 100)
            .render()

        //this.debug = this.add.graphics();
        //image.setDebug(this.debug);

        image.skewXDeg = -25;
        var gui = new Dat.GUI();
        gui.add(image, 'skewXDeg', -90, 90);
        gui.add(image, 'skewYDeg', -90, 90);

        this.add.image(600, 300, image.texture);
    }

    update() {
        // this.debug.clear();
        // this.debug.lineStyle(1, 0x00ff00);
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
    backgroundColor: 0x33333,
    plugins: {
        global: [{
            key: 'rexQuadImage',
            plugin: QuadImagePlugin,
            start: true
        }],
    }
};

var game = new Phaser.Game(config);