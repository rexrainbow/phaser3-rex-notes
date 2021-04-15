import BaseSpinner from '../base/BaseSpinner.js';
import ShapesUpdateMethods from '../../../plugins/gameobjects/shape/customshapes/ShapesUpdateMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Custom extends BaseSpinner {
    constructor(scene, config) {
        super(scene, config);
        this.type = GetValue(config, 'type', 'rexSpinnerCustom');
    }
}

Object.assign(
    Custom.prototype,
    ShapesUpdateMethods
);

export default Custom;