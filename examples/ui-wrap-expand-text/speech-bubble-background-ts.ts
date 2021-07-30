import 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin';
import { CustomShapes } from '../../templates/ui/ui-components';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class SpeechBubble extends CustomShapes {
    constructor(
        scene: Phaser.Scene,
        fillColor?: number,
        strokeColor?: number
    ) {
        super(scene, {
            create: { lines: 1 },
            update: function () {
                var radius = 20;
                var indent = 15;

                var left = 0, right = this.width,
                    top = 0, bottom = this.height, boxBottom = bottom - indent;
                var lines = this.getShapes()[0] as CustomShapes.Lines;
                lines
                    .lineStyle(2, this.getData('strokeColor'), 1)
                    .fillStyle(this.getData('fillColor'), 1)
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
        })

        this
            .setData('fillColor', fillColor)
            .setData('strokeColor', strokeColor)

        scene.add.existing(this);
    }
}

class Demo extends Phaser.Scene {
    rexUI: UIPlugin;

    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() { }

    create() {
        var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;

        this.rexUI.add.sizer({
            x: 400, y: 300,
            width: 500,
            orientation: 'x',

            space: { left: 10, right: 10, top: 10, bottom: 25, item: 10 }
        })
            .addBackground(
                new SpeechBubble(this, COLOR_PRIMARY, 0xffffff)
            )
            .add(
                this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT),
                {
                    proportion: 0,
                    align: 'bottom'
                }
            )
            .add(
                this.rexUI.wrapExpandText(this.add.text(0, 0, content)),
                {
                    proportion: 1,
                    align: 'center',
                    expand: true
                }
            )
            .add(
                this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT),
                {
                    proportion: 0,
                    align: 'bottom'
                }
            )
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000);
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
    scene: Demo,
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);