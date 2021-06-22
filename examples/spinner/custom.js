import 'phaser';
import SpinnerPlugin from '../../templates/spinner/spinner-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var audio = AddAudioSpinner(this, 300, 300, 80, 80);
        var box = AddBoxSpinner(this, 400, 300, 80, 80);

        var graphics = this.add.graphics({
            lineStyle: {
                width: 2, color: 0xff0000, alpha: 1
            }
        })
            .strokeRectShape(audio.getBounds())
            .strokeRectShape(box.getBounds())
    }

    update() { }
}

var AddAudioSpinner = function (scene, x, y, width, height) {
    return scene.rexSpinner.add.custom({
        x: x, y: y, width: width, height: height,

        create: {
            line: 4
        },

        update: function () {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var leftBound = centerX - radius;
            var bottomBound = centerY + radius;
            var maxLineHeight = radius * 2;

            var shapes = this.getShapes(),
                cnt = shapes.length;
            var cellWidth = (radius * 2) / cnt;
            var lineWidth = cellWidth * 0.7;

            // Reset range of value
            if ((this.prevValue === undefined) || (this.prevValue > this.value)) {
                for (var i = 0; i < cnt; i++) {
                    var line = shapes[i];
                    var from = (this.prevValue === undefined) ? Math.random() : line.getData('to');
                    line
                        .setData('from', from)
                        .setData('to', Math.random())
                }
            }
            this.prevValue = this.value;

            for (var i = 0; i < cnt; i++) {
                var line = shapes[i];
                var from = line.getData('from'),
                    to = line.getData('to'),
                    current = Phaser.Math.Linear(from, to, this.value);
                var lineHeight = current * maxLineHeight;
                var x = leftBound + (cellWidth * (i + 0.5));

                line
                    .lineStyle(lineWidth, this.color, 1)
                    .setP0(x, bottomBound)
                    .setP1(x, (bottomBound - lineHeight));

            }
        }
    });
}

var AddBoxSpinner = function (scene, x, y, width, height) {
    return scene.rexSpinner.add.custom({
        x: x, y: y, width: width, height: height,

        create: {
            lines: ['border', 'fill']
        },

        update: function () {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;

            var halfWidth = radius * 0.7;
            var left = centerX - halfWidth,
                right = centerX + halfWidth,
                top = centerY - halfWidth,
                bottom = centerY + halfWidth;

            this.getShape('border')
                .lineStyle(2, this.color, 1)
                .startAt(left, top).lineTo(right, top)
                .lineTo(right, bottom).lineTo(left, bottom)
                .lineTo(left, top).close();

            if (this.value < 0.5) {
                var t = (0.5 - this.value) * 2;
                var fillBottom = top + t * halfWidth * 2;
                this.getShape('fill')
                    .fillStyle(this.color, 1)
                    .startAt(left, top).lineTo(right, top)
                    .lineTo(right, fillBottom).lineTo(left, fillBottom)
                    .lineTo(left, top).close();

            } else { // Rotate
                var t = (this.value - 0.5) * 2;
                var angle = 180 * t;

                this.getShape('border').rotateAround(centerX, centerY, angle);
                this.getShape('fill').fillStyle().lineStyle();
            }
        }
    });
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
            key: 'rexSpinner',
            plugin: SpinnerPlugin,
            mapping: 'rexSpinner'
        }]
    }
};

var game = new Phaser.Game(config);