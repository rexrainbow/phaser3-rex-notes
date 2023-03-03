import phaser from 'phaser/src/phaser.js';
import CanvasPlugin from '../../plugins/canvas-plugin.js';
import PathDataBuilder from '../../plugins/geom/pathdata/PathDataBuilder/PathDataBuilder.js';
import AddPolygonPath from '../../plugins/utils/canvas/AddPolygonPath.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var { width, height } = this.scale;

        this.add.image(width / 2, height / 2, 'classroom');

        var canvas = CreateCanvas(this, {
            width: 100, height: 100, margin: 25,

            key: 'classroom',
            clipX: 100, clipY: 100,
        })

        var debugGraphics = this.add.graphics()

        var DrawBound = function () {
            debugGraphics
                .clear()
                .lineStyle(3, 0xff0000, 1)
                .strokeRectShape(canvas.getBounds())
        }
        DrawBound();

        canvas
            .setInteractive({ draggable: true })
            .on('drag', function (pointer, dragX, dragY) {
                canvas.setPosition(dragX, dragY);

                DrawBound()
            });

    }

    update() { }
}

var CreateCanvas = function (scene, config) {
    var width = config.width,
        height = config.height,
        margin = config.margin;

    var canvasWidth = width + (margin * 2),
        canvasHeight = height + (margin * 2);
    var canvas = scene.add.rexCanvas(0, 0, canvasWidth, canvasHeight).setAlpha(0.5);

    var centerX = canvasWidth / 2,
        centerY = canvasHeight / 2;
    var x0 = margin, y0 = margin,
        x1 = margin + width, y1 = margin + height;
    var lines = new PathDataBuilder();
    lines
        .setIterations(16)
        .clear()
        .startAt(x0, y0)
        .arc(centerX, y0, margin, 180, 360, false)
        .lineTo(x1, y0)
        .arc(x1, centerY, margin, 270, 90, false)
        .lineTo(x1, y1)
        .arc(centerX, y1, margin, 0, 180, false)
        .lineTo(x0, y1)
        .arc(x0, centerY, margin, 90, 270, false)
        .lineTo(x0, y0)
        .close()

    var ctx = canvas.getContext();
    ctx.save();
    ctx.beginPath();

    AddPolygonPath(ctx, lines.toPoints());

    ctx.clip();

    var key = config.key,
        frame = config.frame;
    var clipX = config.clipX,
        clipY = config.clipY;
    canvas.drawFrame(
        key, frame,
        0, 0, canvasWidth, canvasHeight,
        clipX - margin, clipY - margin, canvasWidth, canvasHeight,
    );

    ctx.restore();

    return canvas;
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1024,
    height: 768,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexCanvas',
            plugin: CanvasPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);