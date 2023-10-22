import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
    }

    create() {
        var expBar0 = this.rexUI.add.expBar({
            x: 400, y: 300,
            width: 250, height: 100,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY),

            nameText: this.add.text(0, 0, 'EXP', { fontSize: 20 }),

            valueText: this.rexUI.add.BBCodeText(0, 0, '', { fontSize: 20 }),
            valueTextFormatCallback: function (value, min, max) {
                value = Math.floor(value);
                if (value <= max * 0.3) {
                    value = `[color=red][b]${value}[/b][/color]`;
                } else {
                    value = `[b]${value}[/b]`;
                }
                return `${value}/${max}`;
            },

            barShape: 'circle',
            bar: CreateCustomBar(this, 10).setFillStyle(COLOR_LIGHT).setStrokeStyle(),

            align: {
                text: 'bottom',
            },

            space: {
                left: 40, right: 40, top: 20, bottom: 20,
                barTop: 5, barBottom: 5, barLeft: 6, barRight: 5,
            },

            levelCounter: {
                table: function (level) {
                    return level * 100;
                },
                maxLevel: 10,

                exp: 330,
            },

            easeDuration: 2000

        })
            .layout()

        expBar0.gainExp(200)
        expBar0.exp += 100

    }

    update() { }
}

const DegToRad = Phaser.Math.DegToRad;
var CreateCustomBar = function (scene, circleCount) {
    return scene.rexUI.add.customProgress({
        create: {
            'circle': circleCount,
        },

        update: function () {
            var shapes = this.getShapes();
            var fillColor = this.fillColor;
            var fillAlpha = this.fillAlpha;
            var lineWidth = this.lineWidth;
            var strokeColor = this.strokeColor;
            var strokeAlpha = this.strokeAlpha;

            var centerX = this.centerX;
            var centerY = this.height;
            var radiusX = this.width / 2;
            var radiusY = this.height;
            var radiusIndent = Math.max(radiusX, radiusY) * 0.1;
            var shapeRadius = Math.max(radiusX, radiusY) * 0.08
            var value = this.value * shapes.length;

            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var shape = shapes[i];
                var shapeValue = (value >= 1) ? 1 : value;
                if (shapeValue <= 0) {
                    shapeValue = 0;
                }

                var angle = DegToRad(200 + 140 * (i / (cnt - 1)));
                shape
                    .setVisible(shapeValue > 0)
                    .fillStyle(fillColor, fillAlpha)
                    .lineStyle(lineWidth, strokeColor, strokeAlpha)
                    .setCenterPosition(
                        centerX + (radiusX - radiusIndent) * Math.cos(angle),
                        centerY + (radiusY - radiusIndent) * Math.sin(angle)
                    )
                    .setRadius(
                        shapeValue * shapeRadius
                    )


                value -= shapeValue;

            }
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);