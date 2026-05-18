import Base from '../base/Base';
import UpdateShapeMethods from './UpdateShapeMethods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class AIO extends Base {
    setAnimationMode: any;
    type: any;

    constructor(scene?: any, config?: any) {
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