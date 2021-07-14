import 'phaser';
import CustomProgressPlugin from '../../plugins/customprogress-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var progressBar = CreateReactCircleProgressBar(this)
            .setData('trackColor', 0xA9A9A9)
            .setData('barColor', 0xF08080)
            .setPosition(400, 300)
            .setSize(200, 100)

        var graphics = this.add.graphics({
            lineStyle: {
                width: 2, color: 0xff0000, alpha: 1
            }
        })
            .strokeRectShape(progressBar.getBounds())

        this.tweens.add({
            targets: progressBar,
            value: 1,
            duration: 3000,
            ease: 'Cubic',
        })

    }

    update() { }
}

var CreateReactCircleProgressBar = function (scene) {
    return scene.add.rexCustomProgress({
        type: 'ReactCircularProgress',
        create: {
            arc: ['track', 'bar'],
            circle: ['thumb']
        },
        update: function () {
            var centerX = this.centerX,
                centerY = this.centerY,
                radius = this.radius;

            var deltaAngle = 90;

            var trackRadius = radius * 0.9;
            var trackThickness = Math.ceil(trackRadius / 10);
            var trackColor = this.getData('trackColor');

            var trackStartAngle = 90 + (deltaAngle / 2);
            var trackEndAngle = 90 - (deltaAngle / 2);
            var barEndAngle = trackStartAngle + ((360 - deltaAngle) * this.value);

            var barThickness = trackThickness * 1.1;
            var barColor = this.getData('barColor');
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
        global: [{
            key: 'CustomProgressPlugin',
            plugin: CustomProgressPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);