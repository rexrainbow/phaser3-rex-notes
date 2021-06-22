import 'phaser';
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
        const Between = Phaser.Math.Between;
        var postFxPlugin = this.plugins.get('rexGlowFilterPipeline');
        for (var i = 0; i < 20; i++) {
            let gameObject = this.add.image(0, 0, 'mushroom')
                .setRandomPosition(100, 100, 600, 400)

            gameObject
                .setInteractive()
                .on('pointerover', function () {
                    // Add postfx pipeline
                    var pipeline = postFxPlugin.add(gameObject);

                    gameObject.glowTask = gameObject.scene.tweens.add({
                        targets: pipeline,
                        intensity: 0.02,
                        ease: 'Linear',
                        duration: Between(500, 1000),
                        repeat: -1,
                        yoyo: true
                    });
                })
                .on('pointerout', function () {
                    // Remove postfx pipeline
                    postFxPlugin.remove(gameObject);
                    gameObject.glowTask.stop();
                    gameObject.glowTask = null;
                })
        }
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