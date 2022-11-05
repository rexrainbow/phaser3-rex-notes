import { Lines, Rectangle } from '../../shapes/geoms';

export default {
    buildShapes() {
        this
            .addShape(new Rectangle().setName('box'))
            .addShape(new Lines().setName('checker'))
    },

    updateShapes() {
        var centerX = this.width / 2,
            centerY = this.height / 2,
            radius = Math.min(centerX, centerY);
        var width = radius * 2,
            height = width;
        var x = centerX - radius,
            y = centerY - radius,
            step = width / 4;

        var boxLineWidth = this.boxLineWidth;
        var checkLineWidth = Math.max(width / 10, 2);

        var boxShape = this.getShape('box');
        var checkerShape = this.getShape('checker');

        // Setup shapes
        if (this.isSizeChanged) {
            var halfBoxLineWidth = boxLineWidth / 2;
            boxShape
                .setTopLeftPosition(x + halfBoxLineWidth, y + halfBoxLineWidth)
                .setSize(width - boxLineWidth, height - boxLineWidth)

            checkerShape
                .startAt(step * 1, step * 2)
                .lineTo(step * 2, step * 3)
                .lineTo(step * 3, step * 1)
                .offset(x, y)
                .end()
        }

        // Set styles
        if (this.checked) {
            boxShape
                .fillStyle(this.boxFillColor, this.boxFillAlpha)
                .lineStyle(boxLineWidth, this.boxStrokeColor, this.boxStrokeAlpha)

            checkerShape
                .lineStyle(checkLineWidth, this.checkerColor)
        } else {
            boxShape
                .fillStyle()
                .lineStyle(boxLineWidth, this.boxStrokeColor, this.boxStrokeAlpha)

            checkerShape
                .lineStyle()
        }

        // Play checker animation
        if (this.checked) {
            checkerShape.setDisplayPathSegment(this.checkerAnimProgress);
        }
    }
}