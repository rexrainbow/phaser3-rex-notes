import phaser from 'phaser/src/phaser.js';
import EffectPropertiesPlugin from '../../plugins/effectproperties-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
        this.load.atlas('characters', 'assets/images/characters/characters.png', 'assets/images/characters/characters.json');

        this.load.image('distort', 'assets/images/distortion/noisesmall.png');
        //this.load.image('distort', 'assets/images/distortion/distortion.png');
    }

    create() {
        this.add.image(400, 300, 'classroom');
        this.add.image(400, 300, 'characters', 'A-smile');

        var camera = this.cameras.main;
        this.plugins.get('rexEffectProperties').add(camera);
        camera.displacementKey = 'distort';
        this.tweens.add({
            targets: camera,
            displacementX: -0.5,
            grayscale: 1,
            duration: 3000
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