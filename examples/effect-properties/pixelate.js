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
        var image = this.add.image(200, 300, 'logo');
        this.plugins.get('rexEffectProperties').add(image);
        image.pixelate = 5;

        var image = this.add.image(600, 300, 'logo');
        this.plugins.get('rexEffectProperties').add(image);
        image.blockySize = 5;
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