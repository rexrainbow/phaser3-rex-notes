import CustomShapes from '../customshapes/CustomShapes.js';
import ProgressBase from '../../../utils/progressbase/ProgressBase.js';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

class CustomProgress extends ProgressBase(CustomShapes) {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 2);
            height = GetValue(config, 'height', 2);
        }
        if (config === undefined) {
            config = {};
        }
        if (!config.type) {
            config.type = 'rexCustomProgress';
        }

        super(scene, x, y, width, height, config);

        this.bootProgressBase(config);

        this.setValue(GetValue(config, 'value', 0));
    }

    get centerX() {
        return this.width / 2;;
    }

    get centerY() {
        return this.height / 2;
    }

    get radius() {
        return Math.min(this.centerX, this.centerY);
    }
}

export default CustomProgress;