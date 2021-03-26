import BaseSpinner from '../base/BaseSpinner.js';
import { Line } from '../../../plugins/gameobjects/shape/shapes/shape'

const Linear = Phaser.Math.Linear;

class Audio extends BaseSpinner {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerLos';
        this.prevValue = undefined;
    }

    buildShapes() {
        for (var i = 0; i < 4; i++) {
            var shape = new Line();
            this.addShape(shape);
        }
    }

    updateShapes() {
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
                var shape = shapes[i];
                var from = (this.prevValue === undefined) ? Math.random() : shape.getData('to');
                shape
                    .setData('from', from)
                    .setData('to', Math.random())
            }
        }
        this.prevValue = this.value;

        for (var i = 0; i < cnt; i++) {
            var shape = shapes[i];
            var from = shape.getData('from'),
                to = shape.getData('to'),
                current = Linear(from, to, this.value);
            var lineHeight = current * maxLineHeight;
            var x = leftBound + (cellWidth * (i + 0.5));

            shape
                .lineStyle(lineWidth, this.color, 1)
                .setP0(x, bottomBound)
                .setP1(x, (bottomBound - lineHeight));

        }
    }
}

export default Audio;