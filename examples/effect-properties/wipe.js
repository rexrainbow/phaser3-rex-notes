import phaser from '../../../phaser/src/phaser.js';
import EffectPropertiesPlugin from '../../plugins/effectproperties-plugin.js';

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
        var image = this.add.image(400, 300, 'logo');
        this.plugins.get('rexEffectProperties').add(image);

        var direction = 0;
        this.input.on('pointerdown', function () {
            switch (direction) {
                case 1: image.wipeDown = 0.3; break;
                case 2: image.wipeRight = 0.3; break;
                case 3: image.wipeUp = 0.3; break;
                default: image.wipeLeft = 0.3; break;
            }

            direction = (direction + 1) % 4;
        })


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
            key: 'rexEffectProperties',
            plugin: EffectPropertiesPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);