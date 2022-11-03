import phaser from 'phaser/src/phaser.js';
import CustomShapesPlugin from '../../plugins/customshapes-plugin.js';

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
        var speechBubble, gameObject;

        gameObject = this.add.image(400, 400, 'mushroom')
            .setInteractive({ draggable: true })
            .on('drag', function (pointer, dragX, dragY) {
                gameObject.setPosition(dragX, dragY);
                speechBubble.setData({
                    x: gameObject.x,
                    y: gameObject.y - 30
                })
                    .setDirty()
            });

        speechBubble = CreateSpeechBubbleShape(this)
            .setFillStyle(0x008800, 1)
            .setStrokeStyle(2, 0xffffff, 1)
            .setPosition(400, 300)
            .setSize(200, 100)
            .setData({ 
                x: gameObject.x, 
                y: gameObject.y - 30
            })

        var graphics = this.add.graphics({
            lineStyle: {
                width: 2, color: 0xff0000, alpha: 1
            }
        })
            .strokeRectShape(speechBubble.getBounds())

    }

    update() { }
}

var CreateSpeechBubbleShape = function (scene) {
    return scene.add.rexCustomShapes({
        type: 'SpeechBubble',
        create: { lines: 1 },
        update: function () {
            var radius = 20;

            var left = 0, right = this.width,
                top = 0, bottom = this.height,
                centerX = this.width / 2;
            var localXY = this.worldToLocalXY(this.getData('x'), this.getData('y'), true);

            this.getShapes()[0]
                .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)
                .fillStyle(this.fillColor, this.fillAlpha)
                .setIterations(8)
                // top line, right arc
                .startAt(left + radius, top).lineTo(right - radius, top).arc(right - radius, top + radius, radius, 270, 360)
                // right line, bottom arc
                .lineTo(right, bottom - radius).arc(right - radius, bottom - radius, radius, 0, 90)
                // bottom line
                .lineTo(centerX + 10, bottom).lineTo(localXY.x, localXY.y).lineTo(centerX - 10, bottom)
                // bottom line, left arc
                .lineTo(left + radius, bottom).arc(left + radius, bottom - radius, radius, 90, 180)
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