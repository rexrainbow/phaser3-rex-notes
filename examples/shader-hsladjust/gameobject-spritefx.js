import phaser from '../../../phaser/src/phaser';
import HslAdjustSpriteFXPipelinePlugin from '../../plugins/hsladjustspritefxpipeline-plugin';

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
        var gameObject0 = this.add.image(0, 0, 'classroom').setOrigin(0).setScale(0.5);
        var gameObject1 = this.add.image(400, 0, 'classroom').setOrigin(0).setScale(0.5);
        var gameObject2 = this.add.image(0, 300, 'classroom').setOrigin(0).setScale(0.5);
        var gameObject3 = this.add.image(400, 300, 'classroom').setOrigin(0).setScale(0.5);

        var spriteFxPlugin = this.plugins.get('rexHslAdjustSpriteFXPipeline');
        spriteFxPlugin
            .add(gameObject0, {
                hueRotate: 1
            })
            .add(gameObject1, {
                hueRotate: 0.75
            })
            .add(gameObject2, {
                hueRotate: 0.5
            })
            .add(gameObject3, {
                hueRotate: 0.25
            })
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
            key: 'rexHslAdjustSpriteFXPipeline',
            plugin: HslAdjustSpriteFXPipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);