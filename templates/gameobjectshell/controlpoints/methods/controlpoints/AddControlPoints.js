import {
    TopLeft, TopRight, BottomLeft, BottomRight,
    TopMiddle, BottomMiddle, MiddleLeft, MiddleRight,
    Origin, Rotation,
} from '../Const.js';
import IsFunction from '../../../../../plugins/utils/object/IsFunction.js';
import AddDragMoveBehavior from './AddDragMoveBehavior.js';
import AddDragResizeBehavior from './AddDragResizeBehavior.js';
import AddDragRotationBehavior from './AddDragRotationBehavior.js';


const GetValue = Phaser.Utils.Objects.GetValue;

var GetPointCallback = function (config, key) {
    var callback = GetValue(config, key);

    if (!IsFunction(callback)) {
        config = callback;
        var color = GetValue(config, 'color');
        var alpha = GetValue(config, 'alpha', 1);
        var strokeColor = GetValue(config, 'strokeColor');
        var strokeWidth = GetValue(config, 'strokeWidth', 2);
        var size = GetValue(config, 'size', 20);
        var shape = GetValue(config, 'shape', 'rectangle');
        if (shape === 'rectangle') { // Rectangle            
            callback = function (scene) {
                return scene.add.rectangle(0, 0, size, size, color, alpha)
                    .setStrokeStyle(strokeColor, strokeWidth);
            }
        } else { // Circle
            callback = function (scene) {
                return scene.add.circle(0, 0, (size / 2), color, alpha)
                    .setStrokeStyle(strokeColor, strokeWidth);
            }
        }

    }

    return callback;
}

var AddControlPoints = function (parent, config) {
    var originPointCallback = GetPointCallback(config, 'originPoint');
    var resizePointCallback = GetPointCallback(config, 'resizePoint');
    var rotationPointCallback = GetPointCallback(config, 'rotationPoint');

    var pointsData = [
        { name: TopLeft, callback: resizePointCallback, originX: 1, originY: 1 },
        { name: TopRight, callback: resizePointCallback, originX: 0, originY: 1 },
        { name: BottomLeft, callback: resizePointCallback, originX: 1, originY: 0 },
        { name: BottomRight, callback: resizePointCallback, originX: 0, originY: 0 },

        { name: TopMiddle, callback: resizePointCallback, originX: 0.5, originY: 1 },
        { name: BottomMiddle, callback: resizePointCallback, originX: 0.5, originY: 0 },
        { name: MiddleLeft, callback: resizePointCallback, originX: 1, originY: 0.5 },
        { name: MiddleRight, callback: resizePointCallback, originX: 0, originY: 0.5 },

        { name: Origin, callback: originPointCallback, originX: 0.5, originY: 0.5 },
        { name: Rotation, callback: rotationPointCallback, originX: 0.5, originY: 0.5 },
    ]

    var scene = parent.scene;
    for (var i = 0, cnt = pointsData.length; i < cnt; i++) {
        var pointData = pointsData[i];

        var controlPoint = pointData.callback(scene).setOrigin(pointData.originX, pointData.originY);
        controlPoint.pointName = pointData.name;
        parent.pin(controlPoint);
        parent.addChildrenMap(pointData.name, controlPoint);
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

export default AddControlPoints;