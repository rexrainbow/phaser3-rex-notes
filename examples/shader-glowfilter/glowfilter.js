import GlowFilterPipelinePlugin from '../../plugins/glowfilterpipeline-plugin.js'

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
        var customPipeline = this.plugins.get('rexGlowFilterPipeline').add(this, 'GlowFilter');

        this.add.image(400, 300, 'mushroom')
            .setPipeline('GlowFilter');

        this.tweens.add({
            targets: customPipeline,
            intensity: 0.02,
            ease: 'Linear',
            duration: 1000,
            repeat: -1,
            yoyo: true
        });
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
            key: 'rexGlowFilterPipeline',
            plugin: GlowFilterPipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);