import phaser from '../../../phaser/src/phaser.js';
import Live2dPlugin from '../../plugins/live2d-plugin.js';
import OutlineFilterPlugin from '../../plugins/outlinefilter-plugin.js';

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

        CreateCharacter(this, w * 0.25, h * 0.5);

        CreateCharacter(this, w * 0.75, h * 0.5);


    }

    update() { }

}

var LAYER_FILTER = true;
var CreateCharacter = function (scene, x, y) {
    var gameObject = scene.add.rexLive2d(
        x, y, 'Haru',
        { autoPlayIdleMotion: 'TapBody' }
    )
        .setScale(0.2)

    if (LAYER_FILTER) {
        var layer = scene.add.layer();
        layer.add(gameObject);
        layer
            .enableFilters()
            .filters.internal.addPixelate(10);

    } else {
        gameObject
            .enableFilters()
            .filters.internal.addPixelate(10);

    }

    return gameObject;
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
                key: 'rexOutlineFilter',
                plugin: OutlineFilterPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);