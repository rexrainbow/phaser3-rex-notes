import phaser from 'phaser/src/phaser.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('logo', 'assets/images/logo.png');
    }

    create() {
        this.add.rexBBCodeText(400, 300, '[img=logo][/img]', {
            fixedWidth: 600,
            fixedHeight: 600,
            halign: 'center',
            valign: 'center',
            backgroundColor: '#333333',
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
            },

            images: {
                'logo': {
                    // originX: 0.5,
                    originY: 0.5
                }
            }
        })
            .setOrigin(0.5)

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
            key: 'BBCodeTextPlugin',
            plugin: BBCodeTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);