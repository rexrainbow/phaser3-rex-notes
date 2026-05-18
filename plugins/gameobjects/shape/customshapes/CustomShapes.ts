import BaseShapes from '../shapes/BaseShapes';
import ShapesUpdateMethods from './ShapesUpdateMethods';
import WorldXYToGameObjectLocalXY from '../../../utils/position/WorldXYToGameObjectLocalXY';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

class CustomShapes extends BaseShapes {
    height: any;
    width: any;

    buildShapes: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, width?: any, height?: any, config?: any) {
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

    get centerX() {
        return this.width / 2;
    }

    get centerY() {
        return this.height / 2;
    }

    worldToLocalXY(worldX?: any, worldY?: any, camera?: any, out?: any) {
        if (typeof (camera) === 'boolean') {
            out = camera;
            camera = undefined;
        }

        return WorldXYToGameObjectLocalXY(this, worldX, worldY, camera, out);
    }
}

Object.assign(
    CustomShapes.prototype,
    ShapesUpdateMethods
);

export default CustomShapes;