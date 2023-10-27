import phaser from 'phaser/src/phaser.js';
import CustomProgressPlugin from '../../plugins/customprogress-plugin.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

const COLOR_MAIN = 0x4e342e;
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
        var bar0 = CreateOrbBar(this)
            .setSize(200, 200)
            .setFillStyle(0xff0000, 1)
            .setStrokeStyle(2, 0xffffff, 1)
            .setPosition(250, 300)

        var gui = new Dat.GUI();
        gui.add(bar0, 'value', 0, 1);
    }

    update() { }
}

var RadToDeg = Phaser.Math.RadToDeg;
var CreateOrbBar = function (scene) {
    return scene.add.rexCustomProgress({
        type: 'OrbProgress',
        create: [
            { name: 'bar', type: 'lines' },   // Draw bar first before track
            { name: 'track', type: 'circle' },
        ],
        update: function () {
            var centerX = this.centerX,
                centerY = this.centerY,
                radius = this.radius;

            var track = this.getShape('track')
                .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)
                .setCenterPosition(centerX, centerY)
                .setRadius(radius);

            var bar = this.getShape('bar')
                .fillStyle(this.fillColor, this.fillAlpha)
                .setIterations(16)
                .start();  // Clear points data

            if (this.value < 0.5) {
                var theta = RadToDeg(Math.acos(1 - (this.value * 2)));
                bar.arc(centerX, centerY, radius, 90 - theta, 90 + theta, false);
            } else if (this.value < 1){
                var theta = RadToDeg(Math.acos((this.value * 2) - 1));
                bar.arc(centerX, centerY, radius, 270 + theta, 270 - theta, false);
            } else {
                bar.arc(centerX, centerY, radius, 0, 360, false);
            }

            bar.close();

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