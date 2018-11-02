import Sizer from '../sizer/Sizer.js';
import OnDragThumb from './OnDragThumb.js';
import UpdateThumb from './UpdateThumb.js';
import GetElement from '../utils/GetElement.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;
const Linear = Phaser.Math.Linear;
const Percent = Phaser.Math.Percent;

class Slider extends Sizer {
    constructor(scene, config) {
        // Create sizer
        super(scene, config);
        this.type = 'rexSlider';

        // Add elements
        var track = GetValue(config, 'track', undefined);
        var thumb = GetValue(config, 'thumb', undefined);

        if (track) {
            this.addBackground(track);
        }

        if (thumb) {
            this.add(thumb); // Put into container but not layout it
            thumb
                .setInteractive()
                .on('drag', OnDragThumb, this);
        }

        this.childrenMap = {};
        this.childrenMap.track = track;
        this.childrenMap.thumb = thumb;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        var oldValue = this._value;
        this._value = Clamp(value, 0, 1);

        if (oldValue !== this._value) {
            UpdateThumb.call(this, this._value);
            this.emit('valuechange', this._value, oldValue);
        }
    }

    setValue(value, min, max) {
        if (min !== undefined) {
            value = Percent(value, min, max);
        }
        this.value = value;
        return this;
    }

    addValue(inc, min, max) {
        if (min !== undefined) {
            inc = Percent(inc, min, max);
        }
        this.value += inc;
        return this;
    }

    getValue(min, max) {
        var value = this.value;
        if (min !== undefined) {
            value = Linear(min, max, value);
        }
        return value;
    }
}

var methods = {
    getElement: GetElement,
}
Object.assign(
    Slider.prototype,
    methods
);

const defaultConfig = {};

export default Slider;