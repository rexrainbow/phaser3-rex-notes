import { TRIANGLE, DOT, BOX, DIAMOND } from '../Const.js';
var BuildEndPoint = function (shape,
    x, y,
    preX, preY,
    size, shapeType
) {

    var radius = size / 2;

    switch (shapeType) {
        case TRIANGLE:
            var vx, vy;
            if ((x === preX) && (y === preY)) {
                vx = 1;
                vy = 0;
            } else {
                vx = x - preX;
                vy = y - preY;
                var len = Math.hypot(vx, vy);
                vx /= len;
                vy /= len;
            }

            var nx = -vy;
            var ny = vx;
            var cx = x - vx * size;
            var cy = y - vy * size;
            var halfSize = size / 2;
            var bx1 = cx + nx * halfSize;
            var by1 = cy + ny * halfSize;
            var bx2 = cx - nx * halfSize;
            var by2 = cy - ny * halfSize;

            shape.startAt(x, y)
                .lineTo(bx1, by1)
                .lineTo(bx2, by2)
                .close();
            break;

        case DOT:
            shape
                .start()
                .arc(x, y, radius, 0, 360)
                .close();
            break;

        case BOX:
            shape
                .startAt(x - radius, y - radius)
                .lineTo(size, 0, true)
                .lineTo(0, size, true)
                .lineTo(-size, 0, true)
                .lineTo(0, -size, true)
                .close();
            break;

        case DIAMOND:
            shape
                .startAt(x, y - radius)
                .lineTo(x + radius, y)
                .lineTo(x, y + radius)
                .lineTo(x - radius, y)
                .close();
            break;

        default: // DOT
            shape
                .start()
                .arc(x, y, radius, 0, 360)
                .close();
            break;
    }
}

export default BuildEndPoint;