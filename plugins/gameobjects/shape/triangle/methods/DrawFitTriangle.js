const Wrap = Phaser.Math.Wrap;
const Linear = Phaser.Math.Linear;

var DrawFitTriangle = function () {
    var triangle = this.getShape('triangle');

    var padding = this.padding;
    var right = this.width - padding.right;
    var left = 0 + padding.left;
    var bottom = this.height - padding.bottom;
    var top = 0 + padding.top;
    var centerX = (left + right) / 2;
    var centerY = (top + bottom) / 2;

    /*
    {
        0: {  // right
            a: { x: left, y: top }, b: { x: left, y: bottom }, c: { x: right, y: centerY }
        },
        1: {  // down
            a: { x: right, y: top }, b: { x: left, y: top }, c: { x: centerX, y: bottom }
        },
        2: {  // left
            a: { x: right, y: bottom }, b: { x: right, y: top }, c: { x: left, y: centerY }
        },
        3: {  // up
            a: { x: left, y: bottom }, b: { x: right, y: bottom }, c: { x: centerX, y: top }
        }
    }
    */

    switch (this.direction) {
        case 0: // right
            triangle
                .startAt(left, top).lineTo(left, bottom).lineTo(right, centerY)
                .close();

            break;
        case 1: // down
            triangle
                .startAt(right, top).lineTo(left, top).lineTo(centerX, bottom)
                .close();
            break;

        case 2: // left
            triangle
                .startAt(right, bottom).lineTo(right, top).lineTo(left, centerY)
                .close();
            break;

        case 3: // up
            triangle
                .startAt(left, bottom).lineTo(right, bottom).lineTo(centerX, top)
                .close();
            break;
    }

}
export default DrawFitTriangle;