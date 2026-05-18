import BaseSizer from '../basesizer/BaseSizer';
import Methods from './Methods';
import GetOrientationMode from '../utils/GetOrientationMode';
import GetMaxChildWidth from './GetMaxChildWidth';
import GetMaxChildHeight from './GetMaxChildHeight';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class FixWidthSizer extends BaseSizer {
    align: any;

    _maxChildHeight: any;
    _maxChildWidth: any;
    addChildrenMap: any;
    justifyPercentage: any;
    orientation: any;
    rtl: any;
    runChildrenWrapFlag: any;
    sizerChildren: any;
    space: any;
    type: any;
    wrapResult: any;

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
        this.type = 'rexFixWidthSizer';
        this.sizerChildren = [];

        this.runChildrenWrapFlag = true;

        this.setOrientation(GetValue(config, 'orientation', 0));
        this.setItemSpacing(GetValue(config, 'space.item', 0));
        this.setLineSpacing(GetValue(config, 'space.line', 0));
        this.setIntentLeft(
            GetValue(config, 'space.indentLeftOdd', 0),
            GetValue(config, 'space.indentLeftEven', 0)
        );
        this.setIntentTop(
            GetValue(config, 'space.indentTopOdd', 0),
            GetValue(config, 'space.indentTopEven', 0)
        );
        this.setAlign(GetValue(config, 'align', 0));
        this.setJustifyPercentage(GetValue(config, 'justifyPercentage', 0.25));
        this.setRTL(GetValue(config, 'rtl', false));

        this.wrapResult = undefined;  // {lines, width, height}

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

    setLineSpacing(space?: any) {
        this.space.line = space;
        return this;
    }

    setIntentLeft(odd?: any, even?: any) {
        this.space.indentLeftOdd = odd;
        this.space.indentLeftEven = even;
        return this;
    }

    setIntentTop(odd?: any, even?: any) {
        this.space.indentTopOdd = odd;
        this.space.indentTopEven = even;
        return this;
    }

    setAlign(align?: any) {
        if (typeof (align) === 'string') {
            align = ALIGN[align];
        }
        this.align = align;
        return this;
    }

    setJustifyPercentage(value?: any) {
        this.justifyPercentage = value;
        return this;
    }

    setRTL(enabled?: any) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.rtl = enabled;
        return this;
    }

    get maxChildWidth() {
        if (this._maxChildWidth === undefined) {
            this._maxChildWidth = GetMaxChildWidth.call(this);
        }
        return this._maxChildWidth;
    }

    get maxChildHeight() {
        if (this._maxChildHeight === undefined) {
            this._maxChildHeight = GetMaxChildHeight.call(this);
        }
        return this._maxChildHeight;
    }
}

const ALIGN = {
    left: 0, top: 0,
    right: 1, bottom: 1,
    center: 2,
    justify: 3,
    'justify-left': 3, 'justify-top': 3,
    'justify-right': 4, 'justify-bottom': 4,
    'justify-center': 5
}

Object.assign(
    FixWidthSizer.prototype,
    Methods
);

export default FixWidthSizer;