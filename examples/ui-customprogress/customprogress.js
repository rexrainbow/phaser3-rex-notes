import 'phaser';
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

    preload() { }

    create() {
        var progressBar = CreateProgressBar(this);

        this.tweens.add({
            targets: progressBar,
            value: 0.75,
            duration: 3000,
            ease: 'Cubic',
        })
    }

    update() { }
}

var CreateProgressBar = function (scene) {
    var label = scene.rexUI.add.badgeLabel({
        x: 400, y: 300,
        width: 200, height: 200,

        background: CreateReactCircleProgressBar(scene, 0, 0xF08080, 0xA9A9A9),
        center: CreateText(scene)
    });

    Object.defineProperty(label, 'value', {
        get: function () {
            return label.getElement('background').value;
        },
        set: function (newValue) {
            label.getElement('background').value = newValue;
            label.getElement('center').text = Math.floor(newValue * 100)
            label.layout();
        },
    })

    label.value = 0;

    return label;
}

var CreateReactCircleProgressBar = function (scene, value, barColor, trackColor) {
    return scene.rexUI.add.customProgress({
        type: 'ReactCircularProgress',
        create: [
            { name: 'track', type: 'arc' },
            { name: 'bar', type: 'arc' },
            { name: 'thumb', type: 'circle' },
        ],
        update: function () {
            var centerX = this.centerX,
                centerY = this.centerY,
                radius = this.radius;

            var deltaAngle = 90;

            var trackRadius = radius * 0.9;
            var trackThickness = Math.ceil(trackRadius / 10);

            var trackStartAngle = 90 + (deltaAngle / 2);
            var trackEndAngle = 90 - (deltaAngle / 2);
            var barEndAngle = trackStartAngle + ((360 - deltaAngle) * this.value);

            var barThickness = trackThickness * 1.1;
            var barEndRad = Phaser.Math.DegToRad(barEndAngle);

            var thumbRadius = radius * 0.1;
            var thumbX = Math.cos(barEndRad) * trackRadius;
            var thumbY = Math.sin(barEndRad) * trackRadius;

            this.getShape('track')
                .lineStyle(trackThickness, trackColor)
                .setCenterPosition(centerX, centerY)
                .setRadius(trackRadius)
                .setAngle(trackStartAngle, trackEndAngle);

            this.getShape('bar')
                .lineStyle(barThickness, barColor)
                .setCenterPosition(centerX, centerY)
                .setRadius(trackRadius)
                .setAngle(trackStartAngle, barEndAngle);

            this.getShape('thumb')
                .fillStyle(barColor)
                .setCenterPosition(centerX + thumbX, centerY + thumbY)
                .setRadius(thumbRadius)

        },

        value: value
    })
}

var CreateText = function (scene) {
    return scene.rexUI.add.label({
        icon: scene.rexUI.add.roundRectangle(0, 0, 24, 24, 10, COLOR_LIGHT),
        text: scene.add.text(0, 0, 'Label', { fontSize: '24px' }),
        space: {
            left: 20, right: 20, top: 20, bottom: 20,
            icon: 10
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