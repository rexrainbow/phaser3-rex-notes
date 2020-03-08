import OverlapSizer from '../overlapsizer/OverlapSizer.js';
import Methods from './Methods.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class Pages extends OverlapSizer {
    constructor(scene, x, y, minWidth, minHeight, config) {
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
        this.type = 'rexPages';
        this.childrenMap = this.sizerChildren;
        this._previousKey = undefined;
        this._currentKey = undefined;
        this.setSwapMode(GetValue(config, 'swapMode', 0));
    }

    setSwapMode(mode) {
        if (typeof (mode) === 'string') {
            mode = SWAPMODE[mode];
        }
        this.swapMode = mode;
        return this;
    }

    get previousKey() {
        return this._previousKey;
    }

    get currentKey() {
        return this._currentKey;
    }

    set currentKey(key) {
        this.swapPage(key);
    }

    get currentPage() {
        return this.getPage(this.currentKey);
    }

    get previousPage() {
        return this.getPage(this.previousKey);
    }

    get keys() {
        return Object.keys(this.sizerChildren);
    }
}

Object.assign(
    Pages.prototype,
    Methods
);

const SWAPMODE = {
    invisible: 0,
    destroy: 1
};

export default Pages;