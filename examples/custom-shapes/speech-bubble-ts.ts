import 'phaser';
import CustomShapes from '../../plugins/customshapes';

class SpeechBubble extends CustomShapes {
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number
    ) {

        super(scene, {
            x: x, y: y,
            width: width, height,
            type: 'SpeechBubble',
            create: { lines: 1 },
            update: function () {
                var radius = 20;
                var indent = 15;
                var strokeColor = this.getData('strokeColor');
                var fillColor = this.getData('fillColor');

                var left = 0, right = this.width,
                    top = 0, bottom = this.height, boxBottom = bottom - indent;
                var lines = this.getShapes()[0] as CustomShapes.Lines;
                lines
                    .lineStyle(2, strokeColor, 1)
                    .fillStyle(fillColor, 1)
                    // top line, right arc
                    .startAt(left + radius, top).lineTo(right - radius, top).arc(right - radius, top + radius, radius, 270, 360)
                    // right line, bottom arc
                    .lineTo(right, boxBottom - radius).arc(right - radius, boxBottom - radius, radius, 0, 90)
                    // bottom indent                    
                    .lineTo(right * 0.5, boxBottom).lineTo(right * 0.4, bottom).lineTo(right * 0.3, boxBottom)
                    // bottom line, left arc
                    .lineTo(left + radius, boxBottom).arc(left + radius, boxBottom - radius, radius, 90, 180)
                    // left line, top arc
                    .lineTo(left, top + radius).arc(left + radius, top + radius, radius, 180, 270)
                    .close();

            }
        });

        scene.add.existing(this);
    }
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var speechBubble = new SpeechBubble(this, 400, 300, 200, 100)
            .setData('strokeColor', 0xffffff)
            .setData('fillColor', 0x008800)

        var graphics = this.add.graphics({
            lineStyle: {
                width: 2, color: 0xff0000, alpha: 1
            }
        })
            .strokeRectShape(speechBubble.getBounds())

    }

    update() { }
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
    scene: Demo
};

var game = new Phaser.Game(config);