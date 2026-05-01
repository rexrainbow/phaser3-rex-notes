import { FilterName } from './const.js';

import { Filters as PhaserFilters, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class ShineController extends PhaserFilters.Controller {
    static FilterName = FilterName;

    constructor(camera, config) {
        super(camera, FilterName);

        this.now = 0;

        this.speed = 0.5;
        this.lineWidth = 0.5;
        this.gradient = 3;
        this.reveal = false;

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setSpeed(GetValue(o, 'speed', 0.5));
        this.setLineWidth(GetValue(o, 'lineWidth', 0.5));
        this.setGradient(GetValue(o, 'gradient', 3));
        this.setReveal(GetValue(o, 'reveal', false));

        return this;
    }

    setSpeed(speed) {
        this.speed = speed;
        return this;
    }

    setLineWidth(lineWidth) {
        this.lineWidth = lineWidth;
        return this;
    }

    setGradient(gradient) {
        this.gradient = gradient;
        return this;
    }

    setReveal(reveal) {
        this.reveal = reveal;
        return this;
    }
}

export default ShineController;