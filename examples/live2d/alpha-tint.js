import phaser from 'phaser/src/phaser.js';
import Live2dPlugin from '../../plugins/live2d-plugin.js';
import AlphaTintPipelinePlugin from '../../plugins/alphatintpipeline-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.rexLive2dCoreScript('assets/live2d/core/live2dcubismcore.js');
        this.load.rexLive2d('Haru', 'assets/live2d/Haru/Haru.model3.json');
        this.load.rexLive2d('Hiyori', 'assets/live2d/Hiyori/Hiyori.model3.json');

        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var w = this.game.config.width,
            h = this.game.config.height;

        var layer = CreateCharacter(this, w * 0.25, h * 0.5);
        layer.alphaTintEffect.setAlpha(0.5)

        var layer = CreateCharacter(this, w * 0.75, h * 0.5);
        layer.alphaTintEffect.setTint(0)


    }

    update() { }

}

var CreateCharacter = function (scene, x, y) {
    var layer = scene.add.layer();
    var character = scene.add.rexLive2d(
        x, y, 'Haru',
        { autoPlayIdleMotion: 'TapBody' }
    )
        .setScale(0.2)
    layer.add(character);

    var gameObject = scene.add.image(x, y, 'mushroom');
    layer.add(gameObject);

    var postFxPlugin = scene.plugins.get('rexAlphaTintPipelinePlugin');
    layer.alphaTintEffect = postFxPlugin.add(layer);

    // AlphaTint post-fx pipeline does not work with live2d game object

    return layer;
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    backgroundColor: 0x888888,
    scene: Demo,
    plugins: {
        global: [
            {
                key: 'rexLive2d',
                plugin: Live2dPlugin,
                start: true
            },
            {
                key: 'rexAlphaTintPipelinePlugin',
                plugin: AlphaTintPipelinePlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);