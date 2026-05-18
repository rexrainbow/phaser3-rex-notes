import { FilterName } from './const';

import { Filters as PhaserFilters, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class ShineController extends PhaserFilters.Controller {
    gradient: any;
    lineWidth: any;
    now: any;
    reveal: any;
    speed: any;

    static FilterName = FilterName;

    constructor(camera?: any, config?: any) {
        super(camera, FilterName);

        this.now = 0;

        this.speed = 0.5;
        this.lineWidth = 0.5;
        this.gradient = 3;
        this.reveal = false;

        this.resetFromJSON(config);
    }

    resetFromJSON(o?: any) {
        this.setSpeed(GetValue(o, 'speed', 0.5));
        this.setLineWidth(GetValue(o, 'lineWidth', 0.5));
        this.setGradient(GetValue(o, 'gradient', 3));
        this.setReveal(GetValue(o, 'reveal', false));

        return this;
    }

    setSpeed(speed?: any) {
        this.speed = speed;
        return this;
    }

    setLineWidth(lineWidth?: any) {
        this.lineWidth = lineWidth;
        return this;
    }

    setGradient(gradient?: any) {
        this.gradient = gradient;
        return this;
    }

    setReveal(reveal?: any) {
        this.reveal = reveal;
        return this;
    }
}

export default ShineController;