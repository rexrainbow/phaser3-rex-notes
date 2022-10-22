import phaser from 'phaser/src/phaser.js';
import CustomShapesPlugin from '../../plugins/customshapes-plugin.js';
import WorldXYToGameObjectLocalXY from '../../plugins/utils/position/WorldXYToGameObjectLocalXY.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

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
        var gameObject = this.add.image(400, 390, 'mushroom');

        var speechBubble = CreateSpeechBubbleShape(this)
            .setFillStyle(0x008800, 1)
            .setStrokeStyle(2, 0xffffff, 1)
            .setPosition(400, 300)
            .setSize(200, 100)
            .setData({
                x: gameObject.x,
                y: gameObject.y
            })

        var graphics = this.add.graphics({
            lineStyle: {
                width: 2, color: 0xff0000, alpha: 1
            }
        })
            .strokeRectShape(speechBubble.getBounds())


        var gui = new Dat.GUI();
        gui.add(gameObject, 'x', 330, 470)
            .onChange(function () {
                speechBubble
                    .setData('x', gameObject.x)
                    .setDirty()
            })

    }

    update() { }
}

var CreateSpeechBubbleShape = function (scene) {
    return scene.add.rexCustomShapes({
        type: 'SpeechBubble',
        create: { lines: 1 },
        update: function () {
            var radius = 20;
            var indent = 15;

            var localX;
            var worldX = this.getData('x');
            var worldY = this.getData('y');
            if ((worldX !== undefined) && (worldY !== undefined)) {
                var localXY = WorldXYToGameObjectLocalXY(this, worldX, worldY, undefined, true);
                localX = Phaser.Math.Clamp(localXY.x, 0, this.width);

            } else {
                localX = this.width * 0.5;
            }

            var left = 0, right = this.width,
                top = 0, bottom = this.height, boxBottom = bottom - indent;
            this.getShapes()[0]
                .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)
                .fillStyle(this.fillColor, this.fillAlpha)
                .setIterations(8)
                // top line, right arc
                .startAt(left + radius, top).lineTo(right - radius, top).arc(right - radius, top + radius, radius, 270, 360)
                // right line, bottom arc
                .lineTo(right, boxBottom - radius).arc(right - radius, boxBottom - radius, radius, 0, 90)
                // bottom indent
                .lineTo(localX + 10, boxBottom).lineTo(localX, bottom).lineTo(localX - 10, boxBottom)
                // bottom line, left arc
                .lineTo(left + radius, boxBottom).arc(left + radius, boxBottom - radius, radius, 90, 180)
                // left line, top arc
                .lineTo(left, top + radius).arc(left + radius, top + radius, radius, 180, 270)
                .close();

        }
    })
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
            key: 'CustomShapesPlugin',
            plugin: CustomShapesPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);