import CONST from './const.js';

const RECTANGLE = CONST.RECTANGLE;
const CIRCLE = CONST.CIRCLE;
const CircleContains = Phaser.Geom.Circle.Contains;
const RectangleContains = Phaser.Geom.Rectangle.Contains;

var Contains = function (roundRectangle, x, y) {
    switch (roundRectangle.type) {
        case RECTANGLE:
            return RectangleContains(this, x, y);
            break;
        case CIRCLE:
            return CircleContains(this, x, y);
            break;
        default:
            // TODO:
            break;
    }
}

export default Contains;