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
                        thickness: 8,
                        outlineColor: 0xc41c00,
                        //thickness1: 3,
                        //outlineColor1: 0xff8a50
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