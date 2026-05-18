import OverlapSizer from '../overlapsizer/OverlapSizer';
import Methods from './methods/Methods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Pages extends OverlapSizer {
    _currentKey: any;
    _previousKey: any;
    childrenMap: any;
    fadeInDuration: any;
    getPage: any;
    sizerChildren: any;
    swapMode: any;
    swapPage: any;
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexPages';
        this.childrenMap = this.sizerChildren;
        this._previousKey = undefined;
        this._currentKey = undefined;
        this.setSwapMode(GetValue(config, 'swapMode', 0));
        this.setFadeInDuration(GetValue(config, 'fadeIn', 0));
    }

    setSwapMode(mode?: any) {
        if (typeof (mode) === 'string') {
            mode = SWAPMODE[mode];
        }
        this.swapMode = mode;
        return this;
    }

    setFadeInDuration(duration?: any) {
        this.fadeInDuration = duration;
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