import 'phaser';
import CanvasDataPlugin from '../../plugins/canvasdata-plugin.js';
import CreateRectangleTexture from '../../plugins/utils/texture/CreateRectangleTexture.js';
import LogMaxDelta from '../../plugins/utils/system/LogMaxDelta.js'

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
const RandomXY = Phaser.Math.RandomXY;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.mushrooms;
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var img = this.add.image(0, 0, 'mushroom').setOrigin(0);

        var dotSprites = [],
            angles = [];
        var startX = 250, startY = 100, width = 6, height = 6;
        CreateRectangleTexture(this, 'dot', width, height);
        this.plugins.get('rexCanvasData').textureTColorMap(img)
            .forEachNonZero(function (value, x, y, colorMap) {
                dotSprites.push(
                    createImage(
                        this,
                        (startX + (x * width)),
                        (startY + (y * height)),
                        width, height,
                        (value & 0xffffff),
                        ((value >>> 24) / 255)
                    )
                )
                angles.push(Phaser.Math.DegToRad(Math.random() * 360));
            }, this);

        this.tweens.add({
            targets: dotSprites,
            x: {
                getStart: function (target, key, value, targetIndex, totalTargets, tween) {
                    return target.x + (300 * Math.cos(angles[targetIndex]));
                },
                getEnd: function (target, key, value) {
                    return target.x;
                }
            },
            y: {
                getStart: function (target, key, value, targetIndex, totalTargets, tween) {
                    return target.y + (300 * Math.sin(angles[targetIndex]));
                },
                getEnd: function (target, key, value) {
                    return target.y;
                }
            },
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: 0,            // -1: infinity
            yoyo: false
        });

        console.log(dotSprites.length);
    }

    update(time) {
        LogMaxDelta(time);
    }
}

var createImage = function (scene, x, y, width, height, color, alpha) {
    return scene.add.image(x, y, 'dot')
        .setDisplaySize(width, height)
        .setTintFill(color)
        .setAlpha(alpha)
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
            key: 'rexCanvasData',
            plugin: CanvasDataPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);