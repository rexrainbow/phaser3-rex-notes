import IsFunction from '../../../../../plugins/utils/object/IsFunction';
import { Bounds } from '../Const';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var GetDefaultCallback = function(config?: any) {
    var color = GetValue(config, 'color');
    var alpha = GetValue(config, 'alpha', 0.5);
    var strokeColor = GetValue(config, 'strokeColor');
    var strokeWidth = GetValue(config, 'strokeWidth', 2);
    return function(scene?: any) {
        return scene.add.rectangle(0, 0, 0, 0, color, alpha).setStrokeStyle(strokeColor, strokeWidth);
    }
}
var AddBoundsRectangle = function(parent?: any, config?: any) {
    var callback = GetValue(config, 'boundsRectangle');

    if (!IsFunction(callback)) {
        callback = GetDefaultCallback(callback);
    }

    var scene = parent.scene;
    var boundRectangle = callback(scene);
    parent.pin(boundRectangle);

    parent.addChildrenMap(Bounds, boundRectangle);
}

export default AddBoundsRectangle;