import { Bounds } from '../Const';

var UpdateBoundRectangle = function(parent?: any) {
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