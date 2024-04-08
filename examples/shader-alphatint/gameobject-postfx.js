import phaser from 'phaser/src/phaser.js';
import AlphaTintPipelinePlugin from '../../plugins/alphatintpipeline-plugin.js'

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
        var postFxPlugin = this.plugins.get('rexAlphaTintPipelinePlugin');

        this.add.image(300, 300, 'mushroom')

        var gameObject = this.add.image(400, 300, 'mushroom')
        var postFxPipeline = postFxPlugin
            .add(gameObject, {
                alpha: 0.5
            });

        var gameObject = this.add.image(500, 300, 'mushroom')
        var postFxPipeline = postFxPlugin
            .add(gameObject, {                
                tint: 0xff0000
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
    backgroundColor: 0x888888,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexAlphaTintPipelinePlugin',
            plugin: AlphaTintPipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);