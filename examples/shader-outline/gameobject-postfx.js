import 'phaser';
import OutlinePipelinePlugin from '../../plugins/outlinepipeline-plugin.js';

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
        var postFxPlugin = this.plugins.get('rexOutlinePipeline');
        // postFxPlugin.setQuality(0.08); // Will sample 8 points, default is 10 points with quality = 0.1
        for (var i = 0; i < 20; i++) {
            let gameObject = this.add.image(0, 0, 'mushroom')
                .setRandomPosition(100, 100, 600, 400)

            gameObject
                .setInteractive()
                .on('pointerover', function () {
                    // Add postfx pipeline
                    postFxPlugin.add(gameObject, {
                        thickness: 3,
                        outlineColor: 0xff8a50
                    });

                    // Cascade 2nd outline
                    postFxPlugin.add(gameObject, {
                        thickness: 5,
                        outlineColor: 0xc41c00
                    });
                })
                .on('pointerout', function () {
                    // Remove all outline post-fx pipelines
                    postFxPlugin.remove(gameObject);
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
    backgroundColor: 0x555555,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexOutlinePipeline',
            plugin: OutlinePipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);