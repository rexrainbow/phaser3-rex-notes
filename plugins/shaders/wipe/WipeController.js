import { FilterName } from './const.js';

import { Filters as PhaserFilters, Math as PhaserMath, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const Clamp = PhaserMath.Clamp;

class WipeController extends PhaserFilters.Controller {
    static FilterName = FilterName;

    constructor(camera, config) {
        super(camera, FilterName);

        this.progress = 0;
        this.wipeWidth = 0.1;
        this.direction = 0;
        this.axis = 0;
        this.reveal = false;

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setProgress(GetValue(o, 'progress', 0));
        this.setWipeWidth(GetValue(o, 'wipeWidth', 0.1));
        this.setDirection(GetValue(o, 'direction', 0));
        this.setAxis(GetValue(o, 'axis', 0));

        var reveal = GetValue(o, 'reveal', undefined);
        if (reveal === undefined) {
            reveal = !GetValue(o, 'wipe', true);
        }
        if (reveal) {
            this.enableRevealMode();
        } else {
            this.enableWipeMode();
        }

        return this;
    }

    get progress() {
        return this._progress;
    }

    set progress(value) {
        this._progress = Clamp(value, 0, 1);
    }

    setProgress(value) {
        this.progress = value;
        return this;
    }

    get wipeWidth() {
        return this._wipeWidth;
    }

    set wipeWidth(value) {
        this._wipeWidth = Clamp(value, 0, 1);
    }

    setWipeWidth(wipeWidth) {
        this.wipeWidth = wipeWidth;
        return this;
    }

    setDirection(direction) {
        this.direction = direction;
        return this;
    }

    setAxis(axis) {
        this.axis = axis;
        return this;
    }

    enableWipeMode() {
        this.reveal = false;
        return this;
    }

    enableRevealMode() {
        this.reveal = true;
        return this;
    }

}

export default WipeController;