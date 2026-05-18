import Mesh from '../../mesh/sprite/Sprite';
import InitFaces from './methods/InitFaces';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class Image extends Mesh {
    fourPointsModeRTL: any;
    ignoreDestroy: any;
    isNinePointMode: any;
    scene: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, key?: any, frame?: any, config?: any) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            key = GetValue(config, 'key', null);
            frame = GetValue(config, 'frame', null);
        }

        super(scene, x, y, key, frame);
        this.type = 'rexQuadImage';
        this.isNinePointMode = GetValue(config, 'ninePointMode', false);
        this.fourPointsModeRTL = GetValue(config, 'rtl', false);

        InitFaces(this);
    }

    destroy(fromScene?: any) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        super.destroy(fromScene);
    }
}

export default Image;