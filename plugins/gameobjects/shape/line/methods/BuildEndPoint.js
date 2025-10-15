import { DOT, BOX, DIAMOND } from '../Const.js';
var BuildEndPoint = function (shape, x, y, size, shapeType) {
    var radius = size / 2;

    switch (shapeType) {

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