import OverlapSizer from '../overlapsizer/OverlapSizer.js';
import Methods from './Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Pages extends OverlapSizer {
    constructor(scene, config) {
        super(scene, config);
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