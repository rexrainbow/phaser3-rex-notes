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
        for (var i = 0; i < 20; i++) {
            let gameObject = this.add.image(0, 0, 'mushroom')
                .setRandomPosition(100, 100, 600, 400)

            gameObject
                .setInteractive()
                .on('pointerover', function () {
                    // Add postfx pipeline
                    postFxPlugin.add(gameObject, {
                        thickness: 3,
                        outlineColor: 0xff0000
                    });
                })
                .on('pointerout', function () {
                    // Remove postfx pipeline
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