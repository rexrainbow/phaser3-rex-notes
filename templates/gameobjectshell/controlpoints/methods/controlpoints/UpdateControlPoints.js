import {
    TopLeft, TopRight, BottomLeft, BottomRight,
    TopMiddle, BottomMiddle, MiddleLeft, MiddleRight,
    Origin, Rotation,
} from '../Const.js';

const ControlPointNames = [
    TopLeft, TopRight, BottomRight, BottomLeft,
    TopMiddle, BottomMiddle, MiddleLeft, MiddleRight,
    Origin, Rotation
];

var UpdateControlPoint = function (parent, controlPoint, points) {
    var position = points[controlPoint.pointName];
    controlPoint.setPosition(position.x, position.y);
    controlPoint.setAngle(parent.angle);

    parent
        .resetChildPositionState(controlPoint)
        .resetChildRotationState(controlPoint);
}

var UpdateControlPoints = function (parent, points) {
    var childrenMap = parent.childrenMap;
    for (var i = 0, cnt = ControlPointNames.length; i < cnt; i++) {
        var controlPointName = ControlPointNames[i];
        var controlPoint = childrenMap[controlPointName];
        UpdateControlPoint(parent, controlPoint, points);
    }
}

export default UpdateControlPoints