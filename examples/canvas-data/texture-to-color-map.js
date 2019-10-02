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

        var startX = 250, startY = 100, width = 6, height = 6,
            offsetXY = { x: 0, y: 0 },
            count = 0;
        CreateRectangleTexture(this, 'dot', width, height);
        this.plugins.get('rexCanvasData').textureTColorMap(img)
            .forEachNonZero(function (value, x, y, colorMap) {
                var destinationX = startX + (x * width);
                var destinationY = startY + (y * height);
                offsetXY = RandomXY(offsetXY, 300);
                var gameObject = createImage(
                    this,
                    (destinationX + offsetXY.x),
                    (destinationY + offsetXY.y),
                    width, height,
                    (value & 0xffffff),
                    ((value >>> 24) / 255)
                );

                this.tweens.add({
                    targets: gameObject,
                    x: destinationX,
                    y: destinationY,
                    ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 1000,
                    repeat: 0,            // -1: infinity
                    yoyo: false
                });
                count++;
            }, this)

        console.log(count);
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

var createRectangle = function (scene, x, y, width, height, color, alpha) {
    return scene.add.rectangle(x, y, width, height, color, alpha)
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