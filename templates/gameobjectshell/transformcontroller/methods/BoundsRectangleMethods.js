import IsFunction from '../../../../plugins/utils/object/IsFunction.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var GtDefaultCallback = function (config) {
    var color = GetValue(config, 'color');
    var alpha = GetValue(config, 'alpha', 0.5);
    var strokeColor = GetValue(config, 'strokeColor');
    var strokeWidth = GetValue(config, 'strokeWidth', 2);
    return function (scene) {
        return scene.add.rectangle(0, 0, 0, 0, color, alpha).setStrokeStyle(strokeColor, strokeWidth);
    }
}
var AddBoundsRectangle = function (parent, callback) {
    if (!IsFunction(callback)) {
        callback = GtDefaultCallback(callback);
    }
    var scene = parent.scene;
    var boundRectangle = callback(scene);
    parent.pin(boundRectangle);

    parent.boundRectangle = boundRectangle;
}

var UpdateBoundRectangle = function (parent, points) {
    var boundRectangle = parent.boundRectangle;
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

export {
    AddBoundsRectangle,
    UpdateBoundRectangle
};