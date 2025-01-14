import phaser from '../../../phaser/src/phaser.js';
import ShatterImagePlugin from '../../plugins/shatterimage-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('card2', 'assets/images/card2.png');
        this.load.image('narrowrect', 'assets/images/narrowrect.png');
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var image = this.add.rexShatterImage(400, 300, 'narrowrect')
            .shatter()

        this.debug = this.add.graphics();
        image.setDebug(this.debug);
    }

    update() {
        this.debug.clear();
        this.debug.lineStyle(1, 0x00ff00);
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
    backgroundColor: 0x333333,
    plugins: {
        global: [{
            key: 'rexShatterImage',
            plugin: ShatterImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);