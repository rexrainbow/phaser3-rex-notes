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
        var config = {
            levels: 5,
            period: 0.013,
        }

        var noise = this.plugins.get('rexPerlin').add();
        var canvas = this.add.rexCanvas(0, 0, this.cameras.main.width, this.cameras.main.height).setOrigin(0);
        ResetTerrain(canvas, noise, config);

        this.input.on('pointerdown', function () {
            ResetTerrain(canvas, noise, config);
        })
    }

    update(time, delta) {
    }
}

const GetValue = Phaser.Utils.Objects.GetValue;
var ResetTerrain = function (canvas, noise, config) {
    var levels = GetValue(config, 'levels', 5);
    var period = GetValue(config, 'period', 0.013);
    noise.setSeed(Math.random());
    var width = canvas.width,
        height = canvas.height;

    var ctx = canvas.getCanvas().getContext('2d');
    var imgData = ctx.createImageData(width, height), data = imgData.data;
    var value, imgIndex, step = 255 / levels;
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            value = ValueMapping(noise.perlin2(x * period, y * period), step);
            imgIndex = ((y * width) + x) * 4;
            data[imgIndex + 0] = value;
            data[imgIndex + 1] = value;
            data[imgIndex + 2] = value;
            data[imgIndex + 3] = 255;
        }
    }
    ctx.putImageData(imgData, 0, 0);
}

var ValueMapping = function (value, step) {
    // value: -1~1
    value = (value + 1) / 2; // 0~1
    value *= 255; // 0~255
    value = Math.floor(value / step) * step;
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