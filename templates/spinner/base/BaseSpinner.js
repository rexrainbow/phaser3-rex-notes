import BaseShapes from '../../../plugins/gameobjects/shape/shapes/BaseShapes.js';
import TweenMethods from './TweenMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class BaseSpinner extends BaseShapes {
    constructor(scene, config) {
        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        var width = GetValue(config, 'width', 64);
        var height = GetValue(config, 'height', 64);

        super(scene, x, y, width, height);

        this.duration = GetValue(config, 'duration', 1000);
        this.ease = GetValue(config, 'ease', 'Linear');
        var color = GetValue(config, 'color', 0xffffff);
        var start = GetValue(config, 'start', true);

        this.buildShapes(config);
        this.setColor(color);
        this.setValue(0);

        if (start) {
            this.start();
        }
    }

    buildShapes() {

    }

    get centerX() {
        return this.width / 2;;
    }

    get centerY() {
        return this.height / 2;
    }

    get radius() {
        return Math.min(this.centerX, this.centerY);
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this.dirty = this.dirty || (this._color !== value);
        this._color = value;
        this.setShapesColor(value);
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    setShapesColor(color) {

    }

    get value() {
        return this._value;
    }

    set value(value) {
        value = Phaser.Math.Clamp(value, 0, 1);
        this.dirty = this.dirty || (this._value != value);
        this._value = value;
    }

    setValue(value) {
        this.value = value;
        return this;
    }
}

Object.assign(
    BaseSpinner.prototype,
    TweenMethods
);

export default BaseSpinner;