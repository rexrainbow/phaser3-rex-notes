import BaseSizer from '../basesizer/BaseSizer';
import Methods from './Methods';
import Clear from '../../../plugins/utils/object/Clear';
import IndexOf from '../../../plugins/utils/object/IndexOf';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class OverlapSizer extends BaseSizer {
    addChildrenMap: any;
    sizerChildren: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, minWidth?: any, minHeight?: any, config?: any) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
        } else if (IsPlainObject(minWidth)) {
            config = minWidth;
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
        }

        super(scene, x, y, minWidth, minHeight, config);

        this.type = 'rexOverlapSizer';
        this.sizerChildren = {};

        this.addChildrenMap('items', this.sizerChildren);
    }

    childToKey(gameObject?: any) {
        if (typeof (gameObject) === 'string') {
            var key = gameObject;
            if (this.sizerChildren.hasOwnPropery(key)) {
                return key;
            }
        } else {
            return IndexOf(this.sizerChildren, gameObject);
        }
        return null;
    }
}

Object.assign(
    OverlapSizer.prototype,
    Methods
);

export default OverlapSizer;