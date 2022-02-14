import 'phaser';
import SpinnerPlugin from '../../templates/spinner/spinner-plugin';
import {Custom} from '../../templates/spinner/spinner-components';

class Demo extends Phaser.Scene {
    rexSpinner: SpinnerPlugin;

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

var AddAudioSpinner = function (
    scene: Demo,
    x: number, y: number, width: number, height: number
): SpinnerPlugin.Custom {

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
            var prevValue: number = this.getData('prevValue');
            if ((prevValue === undefined) || (prevValue > this.value)) {
                for (var i = 0; i < cnt; i++) {
                    let line = shapes[i] as Custom.Line;
                    let from = (prevValue === undefined) ? Math.random() : line.getData('to');
                    line
                        .setData('from', from)
                        .setData('to', Math.random())
                }
            }
            this.setData('prevValue', this.value);

            for (var i = 0; i < cnt; i++) {
                let line = shapes[i] as  Custom.Line;
                let from: number = line.getData('from'),
                    to: number = line.getData('to'),
                    current = Phaser.Math.Linear(from, to, this.value);
                let lineHeight = current * maxLineHeight;
                let x = leftBound + (cellWidth * (i + 0.5));

                line
                    .lineStyle(lineWidth, this.color, 1)
                    .setP0(x, bottomBound)
                    .setP1(x, (bottomBound - lineHeight));

            }
        }
    });
}

var AddBoxSpinner = function (
    scene: Demo,
    x: number, y: number, width: number, height: number
): SpinnerPlugin.Custom {

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

            var border = this.getShape('border') as Custom.Lines;
            var fill = this.getShape('fill') as Custom.Lines;

            border
                .lineStyle(2, this.color, 1)
                .startAt(left, top).lineTo(right, top)
                .lineTo(right, bottom).lineTo(left, bottom)
                .lineTo(left, top).close();

            if (this.value < 0.5) {
                var t = (0.5 - this.value) * 2;
                var fillBottom = top + t * halfWidth * 2;
                fill
                    .fillStyle(this.color, 1)
                    .startAt(left, top).lineTo(right, top)
                    .lineTo(right, fillBottom).lineTo(left, fillBottom)
                    .lineTo(left, top).close();

            } else { // Rotate
                var t = (this.value - 0.5) * 2;
                var angle = 180 * t;

                border.rotateAround(centerX, centerY, angle);
                fill.fillStyle().lineStyle();
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