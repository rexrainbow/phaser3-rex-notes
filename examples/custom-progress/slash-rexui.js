import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var ui = CreateLabel(this)
            .layout()
            .setPosition(400, 300)
    }

    update() {
    }
}

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
var CreateLabel = function (scene) {
    var content = 'Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.';
    var label = scene.rexUI.add.label({
        orientation: 1,
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_MAIN).setStrokeStyle(2, COLOR_LIGHT),
        text: scene.add.text(0, 0, content, {
            wordWrap: { width: 300 - 20 - 20 }
        }),
        icon: scene.rexUI.add.roundRectangle(0, 0, 160, 160, 20, COLOR_DARK),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10, }
    });

    var slash = CreateSlash(scene, 5, 50)
        .setFillStyle(0xffffff, 0.5)
        .setEaseValueDuration(1000)
        .easeValueRepeat(0, 1, -1, 3000)
        .setBlendMode('ADD')
    label.addBackground(slash);

    return label;
}

var Linear = Phaser.Math.Linear;
var Clamp = Phaser.Math.Clamp;
var CreateSlash = function (scene, slashLineWidth, slashSlope) {
    return scene.rexUI.add.customProgress({
        type: 'SlashProgress',
        create: [
            { name: 'slash', type: 'lines' },
        ],
        update: function () {
            var slash = this.getShape('slash')

            // Draw nothing if value === 0
            if (this.value === 0) {
                slash.start();
                return;
            }

            var alphaRatio = 1 - this.value;
            var strokeAlpha = this.strokeAlpha * alphaRatio;
            var fillAlpha = this.fillAlpha * alphaRatio;
            slash
                .lineStyle(this.lineWidth, this.strokeColor, strokeAlpha)
                .fillStyle(this.fillColor, fillAlpha);

            /*
            x0 - x3
            |    |
            x1 - x2
            */
            var width = this.width,
                height = this.height;
            var startX0 = width + (slashLineWidth / 2);
            var endX0 = 0 + (slashLineWidth / 2);
            var x0 = Linear(startX0, endX0, this.value);
            var x1 = x0 - slashSlope;
            var x2 = x1 + slashLineWidth;
            var x3 = x0 + slashLineWidth;

            x0 = Clamp(x0, 0, width);
            x1 = Clamp(x1, 0, width);
            x2 = Clamp(x2, 0, width);
            x3 = Clamp(x3, 0, width);

            slash
                .startAt(x0, 0)
                .lineTo(x1, height)
                .lineTo(x2, height)
                .lineTo(x3, 0)
                .close()

        },
    })
}

var config = {
    type: Phaser.AUTO,
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