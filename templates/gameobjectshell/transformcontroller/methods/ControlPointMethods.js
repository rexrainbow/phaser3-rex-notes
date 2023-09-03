import {
    TopLeft, TopRight, BottomLeft, BottomRight,
    TopMiddle, BottomMiddle, MiddleLeft, MiddleRight,
    Origin
} from './Const.js';
import IsFunction from '../../../../plugins/utils/object/IsFunction.js';
import AddDragMoveBehavior from './AddDragMoveBehavior.js';
import AddDragResizeBehavior from './AddDragResizeBehavior.js';


const GetValue = Phaser.Utils.Objects.GetValue;

var GtDefaultCallback = function (config) {
    var color = GetValue(config, 'color');
    var alpha = GetValue(config, 'alpha', 1);
    var strokeColor = GetValue(config, 'strokeColor');
    var strokeWidth = GetValue(config, 'strokeWidth', 2);
    var radius = GetValue(config, 'radius', 10);
    return function (scene) {
        return scene.add.circle(0, 0, radius, color, alpha).setStrokeStyle(strokeColor, strokeWidth);
    }
}

const ControlPointNames = [TopLeft, TopRight, BottomRight, BottomLeft, TopMiddle, BottomMiddle, MiddleLeft, MiddleRight, Origin];

var AddControlPoints = function (parent, callback) {
    if (!IsFunction(callback)) {
        callback = GtDefaultCallback(callback);
    }

    var scene = parent.scene;
    for (var i = 0, cnt = ControlPointNames.length; i < cnt; i++) {
        var controlPointName = ControlPointNames[i];
        var controlPoint = callback(scene);
        controlPoint.pointName = controlPointName;
        parent.pin(controlPoint);
        parent.addChildrenMap(controlPointName, controlPoint);
    }

    var childrenMap = parent.childrenMap;
    AddDragMoveBehavior(parent, childrenMap.origin);
    AddDragResizeBehavior(parent, childrenMap.topLeft, childrenMap.bottomRight, 'xy');
    AddDragResizeBehavior(parent, childrenMap.bottomRight, childrenMap.topLeft, 'xy');
    AddDragResizeBehavior(parent, childrenMap.topRight, childrenMap.bottomLeft, 'xy');
    AddDragResizeBehavior(parent, childrenMap.bottomLeft, childrenMap.topRight, 'xy');
    AddDragResizeBehavior(parent, childrenMap.topMiddle, childrenMap.bottomMiddle, 'y');
    AddDragResizeBehavior(parent, childrenMap.bottomMiddle, childrenMap.topMiddle, 'y');
    AddDragResizeBehavior(parent, childrenMap.middleLeft, childrenMap.middleRight, 'x');
    AddDragResizeBehavior(parent, childrenMap.middleRight, childrenMap.middleLeft, 'x');
}

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

export {
    AddControlPoints,
    UpdateControlPoints
}