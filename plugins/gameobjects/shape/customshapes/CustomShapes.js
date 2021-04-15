import BaseShapes from '../shapes/BaseShapes.js';
import ShapesUpdateMethods from './ShapesUpdateMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class CustomShapes extends BaseShapes {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 2);
            height = GetValue(config, 'height', 2);
        }
        super(scene, x, y, width, height);
        this.type = GetValue(config, 'type', 'rexCustomShapes');
        this.buildShapes(config);
    }
}

Object.assign(
    CustomShapes.prototype,
    ShapesUpdateMethods
);

export default CustomShapes;