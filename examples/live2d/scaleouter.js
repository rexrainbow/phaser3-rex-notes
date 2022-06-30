import phaser from 'phaser/src/phaser.js';
import Live2dPlugin from '../../plugins/live2d-plugin.js';
import ScaleOuterPlugin from '../../plugins/scaleouter-plugin.js';
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
        var x = this.game.config.width / 2,
            y = this.game.config.height / 2;

        var character = this.add.rexLive2d(x, y, 'Haru', {
            autoPlayIdleMotion: 'TapBody'
        })
            .setScale(0.2)

        var gui = new Dat.GUI();
        gui.add(character, 'x', 0, x * 2);
        gui.add(character, 'y', 0, y * 2);
        gui.add(character, 'scale', 0.1, 1);
        gui.add(character, 'angle', -180, 180);

        var viewportGraphics = this.add.graphics();
        var modelGraphics = this.add.graphics();
        var print = this.add.text(0, 0, '', { fontSize: 64 })
        this.scale.on('resize', function () {
            DrawViewport(viewportGraphics);
            DrawModelBounds(character, modelGraphics);
            PrintCameraZoom(print);
        });
        DrawViewport(viewportGraphics);
        DrawModelBounds(character, modelGraphics);
        PrintCameraZoom(print);
    }

    update() { }
}

var DrawViewport = function (graphics) {
    var scene = graphics.scene;
    var innerViewport = scene.rexScaleOuter.innerViewport;
    var outerViewport = scene.rexScaleOuter.outerViewport;
    graphics
        .clear()
        .lineStyle(10, 0x00ff00)
        .strokeRectShape(innerViewport)
        .lineStyle(10, 0xff0000)
        .strokeRectShape(outerViewport)

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

var PrintCameraZoom = function (textObject) {
    textObject.text = textObject.scene.cameras.main.zoom.toFixed(2);
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.NONE,
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
        scene: [{
            key: 'rexScaleOuter',
            plugin: ScaleOuterPlugin,
            mapping: 'rexScaleOuter'
        }]
    }
};

var game = new Phaser.Game(config);