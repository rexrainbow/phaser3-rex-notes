import BaseSizer from '../basesizer/BaseSizer';
import Methods from './Methods';
import GetChildrenProportion from './GetChildrenProportion';
import GetOrientationMode from '../utils/GetOrientationMode';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class Sizer extends BaseSizer {
    orientation: any;

    _childrenProportion: any;
    addChildrenMap: any;
    rtl: any;
    sizerChildren: any;
    space: any;
    startChildIndex: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, minWidth?: any, minHeight?: any, orientation?: any, config?: any) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
            orientation = GetValue(config, 'orientation', 0);
        } else if (IsPlainObject(minWidth)) {
            config = minWidth;
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
            orientation = GetValue(config, 'orientation', 0);
        } else if (IsPlainObject(orientation)) {
            config = orientation;
            orientation = GetValue(config, 'orientation', 0);
        }

        if (orientation === undefined) {
            orientation = 0;
        }
        super(scene, x, y, minWidth, minHeight, config);

        this.type = 'rexSizer';
        this.sizerChildren = [];
        this.setOrientation(orientation);
        this.setItemSpacing(GetValue(config, 'space.item', 0));
        this.setStartChildIndex(GetValue(config, 'startChildIndex', 0));
        this.setRTL(GetValue(config, 'rtl', false));

        this.addChildrenMap('items', this.sizerChildren);
    }

    setOrientation(orientation?: any) {
        this.orientation = GetOrientationMode(orientation);
        return this;
    }

    setItemSpacing(space?: any) {
        this.space.item = space;
        return this;
    }

    setStartChildIndex(index?: any) {
        this.startChildIndex = index;
        return this;
    }

    setRTL(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.rtl = enable;
        return this;
    }

    get childrenProportion() {
        if (this._childrenProportion === undefined) {
            this._childrenProportion = GetChildrenProportion.call(this);
        }
        return this._childrenProportion;
    }
}

Object.assign(
    Sizer.prototype,
    Methods
);

export default Sizer;