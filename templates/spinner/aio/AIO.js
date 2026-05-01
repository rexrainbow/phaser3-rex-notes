import Base from '../base/Base.js';
import UpdateShapeMethods from './UpdateShapeMethods.js';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class AIO extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerAIO';

        this.setAnimationMode(GetValue(config, 'animationMode'));
    }
}

Object.assign(
    AIO.prototype,
    UpdateShapeMethods,
)

export default AIO;