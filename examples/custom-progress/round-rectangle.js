import phaser from 'phaser/src/phaser.js';
import CustomProgressPlugin from '../../plugins/customprogress-plugin.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var bar0 = CreateRoundRectangleProgressBar(this)
            .setSize(200, 100)
            .setFillStyle(COLOR_PRIMARY, 1)
            .setStrokeStyle(2, 0xffffff, 1)
            .setPosition(250, 300)

        var bar1 = CreateRoundRectangleProgressBar(this)
            .setSize(100, 200)
            .setFillStyle(COLOR_PRIMARY, 1)
            .setStrokeStyle(2, 0xffffff, 1)
            .setPosition(550, 300)

        var gui = new Dat.GUI();
        gui.add(bar0, 'value', 0, 1);
        gui.add(bar1, 'value', 0, 1);
    }

    update() { }
}

var RadToDeg = Phaser.Math.RadToDeg;
var CreateRoundRectangleProgressBar = function (scene) {
    return scene.add.rexCustomProgress({
        type: 'RoundRectangleProgress',
        create: [
            { name: 'bar', type: 'lines' },   // Draw bar first before track
            { name: 'track', type: 'lines' },
        ],
        update: function () {
            var width = this.width,
                height = this.height;
            var radius = Math.min(width, height) / 2;

            var track = this.getShape('track')
                .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)
                .setIterations(16)
                .start();  // Clear points data
            var bar = this.getShape('bar')
                .fillStyle(this.fillColor, this.fillAlpha)
                .setIterations(16)
                .start();  // Clear points data

            if (width >= height) {
                var px0 = radius;
                var px1 = width - radius;
                var py = radius;
                track
                    .arc(px0, py, radius, 90, 270, false)
                    .verticalLineTo(px1)
                    .arc(px1, py, radius, 270, 90, false)
                    .verticalLineTo(px0)
                    .end();

                var barValue = this.value * width;
                if (barValue < px0) {
                    var theta = RadToDeg(Math.acos((px0 - barValue) / radius));
                    bar
                        .arc(px0, py, radius, 180 - theta, 180 + theta, false);

                } else if (barValue < px1) {
                    bar
                        .arc(px0, py, radius, 90, 270, false)
                        .verticalLineTo(barValue)
                        .horizontalLineTo(height)
                        .verticalLineTo(px0);

                } else if (barValue < width) {
                    var theta = RadToDeg(Math.acos((barValue - px1) / radius))
                    bar
                        .arc(px0, py, radius, 90, 270, false)
                        .verticalLineTo(px1)
                        .arc(px1, py, radius, 270, 360 - theta, false)
                        .arc(px1, py, radius, theta, 90, false)
                        .verticalLineTo(px0)

                } else {
                    bar
                        .arc(px0, py, radius, 90, 270, false)
                        .verticalLineTo(px1)
                        .arc(px1, py, radius, 270, 90, false)
                        .verticalLineTo(px0)
                }

                bar.close();

            } else {
                var py0 = radius;
                var py1 = height - radius;
                var px = radius;
                track
                    .arc(px, py0, radius, 180, 360, false)
                    .horizontalLineTo(py1)
                    .arc(px, py1, radius, 0, 180, false)
                    .horizontalLineTo(py0)
                    .end();

                var barValue = this.value * height;
                if (barValue < py0) {
                    var theta = RadToDeg(Math.acos((py0 - barValue) / radius));
                    bar
                        .arc(px, py0, radius, 270 - theta, 270 + theta, false);

                } else if (barValue < py1) {
                    bar
                        .arc(px, py0, radius, 180, 360, false)
                        .horizontalLineTo(barValue)
                        .verticalLineTo(0)
                        .horizontalLineTo(py0);

                } else if (barValue < height) {
                    var theta = RadToDeg(Math.acos((barValue - py1) / radius))
                    bar
                        .arc(px, py0, radius, 180, 360, false)
                        .horizontalLineTo(py1)
                        .arc(px, py1, radius, 0, 90 - theta, false)
                        .arc(px, py1, radius, 90 + theta, 180, false)
                        .horizontalLineTo(py0)

                } else {
                    bar
                        .arc(px, py0, radius, 180, 360, false)
                        .horizontalLineTo(py1)
                        .arc(px, py1, radius, 0, 180, false)
                        .horizontalLineTo(px)
                }

                bar.close();
            }

        },
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
            key: 'CustomProgressPlugin',
            plugin: CustomProgressPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);