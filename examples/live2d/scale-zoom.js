import phaser from 'phaser/src/phaser.js';
import Live2dPlugin from '../../plugins/live2d-plugin.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.rexLive2dCoreScript('assets/live2d/core/live2dcubismcore.js');
        this.load.rexLive2d('Haru', 'assets/live2d/Haru/Haru.model3.json');
    }

    create() {
        var x = 200,
            y = 250;

        var character = this.add.rexLive2d(x, y, 'Haru', {
            autoPlayIdleMotion: 'TapBody'
        })
            .setScale(0.1)

        var gui = new Dat.GUI();
        gui.add(character, 'x', 0, this.game.config.width);
        gui.add(character, 'y', 0, this.game.config.height );
        gui.add(character, 'scale', 0.1, 1);
        gui.add(character, 'angle', -180, 180);

        var camera = this.cameras.main;
        gui.add(camera, 'zoom', 0, 3);

        var modelGraphics = this.add.graphics();
        this.events.on("update", function () {
            DrawModelBounds(character, modelGraphics);
        });
        DrawModelBounds(character, modelGraphics);
    }

    update() { }
}

var DrawModelBounds = function (model, graphics) {
    graphics
        .clear()
        .lineStyle(5, 0xffff00)
        .strokePoints([
            model.getTopLeft(),
            model.getTopRight(),
            model.getBottomRight(),
            model.getBottomLeft()
        ], true, true)
        .lineStyle(5, 0xff0000)
        .lineBetween(
            model.x,
            model.y,
            model.x + 100 * Math.cos(model.rotation),
            model.y + 100 * Math.sin(model.rotation),
        )
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [
            {
                key: 'rexLive2d',
                plugin: Live2dPlugin,
                start: true
            }
        ],
    }
};

var game = new Phaser.Game(config);