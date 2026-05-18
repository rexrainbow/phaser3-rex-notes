import Base from '../base/Base';
import ShapesUpdateMethods from '../../../plugins/gameobjects/shape/customshapes/ShapesUpdateMethods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Custom extends Base {
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = GetValue(config, 'type', 'rexSpinnerCustom');
    }
}

Object.assign(
    Custom.prototype,
    ShapesUpdateMethods
);

export default Custom;