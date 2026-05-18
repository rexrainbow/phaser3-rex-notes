import Base from '../base/Base';
import UpdateShapeMethods from './UpdateShapeMethods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Arrow extends Base {
    direction: any;
    setDirection: any;
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexSpinnerArrow';
    }

    resetFromConfig(config?: any, setDefaults?: any) {
        if (setDefaults === undefined) {
            setDefaults = false;
        }

        super.resetFromConfig(config, setDefaults);

        var defaultValue;

        defaultValue = (setDefaults) ? 'down' : this.direction;
        this.setDirection(GetValue(config, 'direction', defaultValue));

        return this;
    }
}

Object.assign(
    Arrow.prototype,
    UpdateShapeMethods,
)

export default Arrow;