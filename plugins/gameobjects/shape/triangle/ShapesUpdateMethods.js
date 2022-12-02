import { Lines } from '../shapes/geoms';

const DegToRad = Phaser.Math.DegToRad;
const Rad120 = DegToRad(120);

export default {
    buildShapes() {
        this
            .addShape(new Lines().setName('triangle'))
    },

    updateShapes() {
        var right = this.width, left = 0,
            bottom = this.height, top = 0;
        var centerX = right / 2,
            centerY = bottom / 2;

        var triangle = this.getShape('triangle')
            .fillStyle(this.fillColor, this.fillAlpha)
            .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)

        if (this.shapeMode === 0) {
            var padding = this.padding;
            right -= padding.right;
            left += padding.left;
            bottom -= padding.bottom;
            top += padding.top;
            switch (this.direction) {
                case 0:  // right
                    triangle
                        .startAt(left, top).lineTo(left, bottom).lineTo(right, centerY)
                        .close()
                    break;

                case 1:  // down
                    triangle
                        .startAt(left, top).lineTo(right, top).lineTo(centerX, bottom)
                        .close()
                    break;

                case 2:  // left
                    triangle
                        .startAt(right, top).lineTo(right, bottom).lineTo(left, centerY)
                        .close()
                    break;

                case 3:  // up
                    triangle
                        .startAt(left, bottom).lineTo(right, bottom).lineTo(centerX, top)
                        .close()
                    break;

            }

        } else {
            var radius = Math.min(centerX, centerY) * this.radius,
                verticeRotation = this.verticeRotation;

            triangle
                .startAt(
                    centerX + radius * Math.cos(verticeRotation),
                    centerY + radius * Math.sin(verticeRotation)
                )
                .lineTo(
                    centerX + radius * Math.cos(verticeRotation + Rad120),
                    centerY + radius * Math.sin(verticeRotation + Rad120)
                )
                .lineTo(
                    centerX + radius * Math.cos(verticeRotation - Rad120),
                    centerY + radius * Math.sin(verticeRotation - Rad120)
                )
                .close()
        }

    }
}