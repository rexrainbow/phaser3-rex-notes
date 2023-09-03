import {
    TopLeft, TopRight, BottomLeft, BottomRight,
    TopMiddle, BottomMiddle, MiddleLeft, MiddleRight,
    Origin, Rotation,
} from './Const.js';
import IsFunction from '../../../../plugins/utils/object/IsFunction.js';
import AddDragMoveBehavior from './AddDragMoveBehavior.js';
import AddDragResizeBehavior from './AddDragResizeBehavior.js';
import AddDragRotationBehavior from './AddDragRotationBehavior.js';

const ControlPointNames = [
    TopLeft, TopRight, BottomRight, BottomLeft,
    TopMiddle, BottomMiddle, MiddleLeft, MiddleRight,
    Origin, Rotation
];

const GetValue = Phaser.Utils.Objects.GetValue;

var GetPointCallback = function (config, key) {
    var callback = GetValue(config, key);

    if (!IsFunction(callback)) {
        config = callback;
        var color = GetValue(config, 'color');
        var alpha = GetValue(config, 'alpha', 1);
        var strokeColor = GetValue(config, 'strokeColor');
        var strokeWidth = GetValue(config, 'strokeWidth', 2);
        var radius = GetValue(config, 'radius', 10);
        callback = function (scene) {
            return scene.add.circle(0, 0, radius, color, alpha).setStrokeStyle(strokeColor, strokeWidth);
        }
    }

    return callback;
}

var AddControlPoints = function (parent, config) {
    var originPointCallback = GetPointCallback(config, 'originPoint');
    var resizePointCallback = GetPointCallback(config, 'resizePoint');
    var rotationPointCallback = GetPointCallback(config, 'rotationPoint');

    var pointsData = [
        { name: TopLeft, callback: resizePointCallback },
        { name: TopRight, callback: resizePointCallback },
        { name: BottomRight, callback: resizePointCallback },
        { name: BottomLeft, callback: resizePointCallback },
        { name: TopMiddle, callback: resizePointCallback },
        { name: BottomMiddle, callback: resizePointCallback },
        { name: MiddleLeft, callback: resizePointCallback },
        { name: MiddleRight, callback: resizePointCallback },
        { name: Origin, callback: originPointCallback },
        { name: Rotation, callback: rotationPointCallback },
    ]

    var scene = parent.scene;
    for (var i = 0, cnt = pointsData.length; i < cnt; i++) {
        var pointData = pointsData[i];
        var controlPointName = pointData.name;
        var controlPoint = pointData.callback(scene);

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

    AddDragRotationBehavior(parent, childrenMap.rotation, childrenMap.origin);
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