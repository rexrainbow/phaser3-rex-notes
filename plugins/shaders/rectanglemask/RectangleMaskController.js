import { FilterName } from './const.js';

import { Filters as PhaserFilters, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class RectangleMaskController extends PhaserFilters.Controller {
    static FilterName = FilterName;

    constructor(camera, config) {
        super(camera, FilterName);

        this.x = 0;
        this.y = 0;
        this.width = camera.width;
        this.height = camera.height;
        this.invert = false;
        this.feather = 0;

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setRectangle(
            GetValue(o, 'x', this.x),
            GetValue(o, 'y', this.y),
            GetValue(o, 'width', this.width),
            GetValue(o, 'height', this.height)
        );
        this.setInvert(GetValue(o, 'invert', false));
        this.setFeather(GetValue(o, 'feather', 0));

        return this;
    }

    setRectangle(x, y, width, height) {
        this.setPosition(x, y);
        this.setSize(width, height);

        return this;
    }

    setPosition(x, y) {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }

        this.x = x;
        this.y = y;

        return this;
    }

    setSize(width, height) {
        if (width === undefined) { width = this.camera.width; }
        if (height === undefined) { height = this.camera.height; }

        this.width = width;
        this.height = height;

        return this;
    }

    setInvert(invert) {
        if (invert === undefined) { invert = true; }

        this.invert = invert;

        return this;
    }

    setFeather(feather) {
        if (feather === undefined) { feather = 0; }

        this.feather = feather;

        return this;
    }

}

export default RectangleMaskController;
