import PerlinPlugin from '../../plugins/perlin-plugin.js';
import CanvasPlugin from '../../plugins/canvas-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.clock;
        this.text;
    }

    preload() { }

    create() {
        var level = 5, period = 0.013;

        var noise = this.plugins.get('rexPerlin').add(Math.random());
        var canvas = this.add.rexCanvas(0, 0, this.cameras.main.width, this.cameras.main.height).setOrigin(0);
        var width = canvas.width,
            height = canvas.height;

        var ctx = canvas.getCanvas().getContext('2d');
        var imgData = ctx.createImageData(width, height), data = imgData.data;
        var value, imgIndex;
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                value = valueMapping(noise.perlin2(x * period, y * period), level);
                imgIndex = ((y * width) + x) * 4;
                data[imgIndex + 0] = value;
                data[imgIndex + 1] = value;
                data[imgIndex + 2] = value;
                data[imgIndex + 3] = 255;
            }
        }
        ctx.putImageData(imgData, 0, 0);
    }

    update(time, delta) {
    }
}

var valueMapping = function (value, level) {
    level = 255 / level;
    // value: -1~1
    value = (value + 1) / 2; // 0~1
    value *= 255; // 0~255
    value = Math.floor(value / level) * level;
    return Math.floor(value);
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
        global: [
            {
                key: 'rexPerlin',
                plugin: PerlinPlugin,
                start: true
            },
            {
                key: 'rexCanvas',
                plugin: CanvasPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);