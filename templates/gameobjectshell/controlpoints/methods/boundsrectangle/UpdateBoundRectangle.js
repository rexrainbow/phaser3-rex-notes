import { Bounds } from '../Const.js';

var UpdateBoundRectangle = function (parent) {
    var boundRectangle = parent.childrenMap[Bounds];
    boundRectangle
        .setOrigin(parent.originX, parent.originY)
        .setPosition(parent.x, parent.y)
        .setAngle(parent.angle)
        .setSize(parent.width, parent.height)

    parent
        .resetChildPositionState(boundRectangle)
        .resetChildRotationState(boundRectangle)
        .resetChildScaleState(boundRectangle)
}

export default UpdateBoundRectangle;