import Sizer from '../sizer/Sizer.js';
import CreateBackground from '../utils/build/CreateBackground.js';
import ProgressBase from '../../../plugins/utils/progressbase/ProgressBase.js';
import RegisterInputEvents from './methods/input/RegisterInputEvents.js';
import GetStartPoint from './methods/GetStartPoint.js';
import GetEndPoint from './methods/GetEndPoint.js';
import UpdateThumb from './methods/UpdateThumb.js';
import UpdateIndicator from './methods/UpdateIndicator.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const Clamp = Phaser.Math.Clamp;
const SnapTo = Phaser.Math.Snap.To;

class Slider extends ProgressBase(Sizer) {
    constructor(scene, config) {
        // Create sizer
        super(scene, config);
        this.type = 'rexSlider';

        this.bootProgressBase(config);

        this.reverseAxis = GetValue(config, 'reverseAxis', false);

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var track = GetValue(config, 'track', undefined);
        var indicator = GetValue(config, 'indicator', undefined);
        var thumb = GetValue(config, 'thumb', undefined);

        if (background) {
            if (IsPlainObject(background)) {
                background = CreateBackground(scene, background);
            }
            this.addBackground(background);
        }

        if (track) {
            if (IsPlainObject(track)) {
                track = CreateBackground(scene, track);
            }
            this.add(track,
                {
                    proportion: 1,
                    expand: true,
                    minWidth: ((this.orientation === 0) ? 0 : undefined),
                    minHeight: ((this.orientation === 1) ? 0 : undefined)
                }
            )
        }

        if (indicator) {
            if (IsPlainObject(indicator)) {
                indicator = CreateBackground(scene, indicator);
            }
            this.pin(indicator); // Put into container but not layout it
        }

        if (thumb) {
            if (IsPlainObject(thumb)) {
                thumb = CreateBackground(scene, thumb);
            }
            this.pin(thumb); // Put into container but not layout it

            var thumbOffsetX = GetValue(config, 'thumbOffsetX', 0);
            var thumbOffsetY = GetValue(config, 'thumbOffsetY', 0);
            this.setThumbOffset(thumbOffsetX, thumbOffsetY);
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('track', track);
        this.addChildrenMap('indicator', indicator);
        this.addChildrenMap('thumb', thumb);

        this.setEnable(GetValue(config, 'enable', undefined));

        var gap = GetValue(config, 'tick', undefined);
        if (gap === undefined) {
            gap = GetValue(config, 'gap', undefined)
        }
        this.setGap(gap);

        // Input
        RegisterInputEvents.call(this, config);

        this.setValue(GetValue(config, 'value', 0), GetValue(config, 'min', undefined), GetValue(config, 'max', undefined));

    }

    setEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.enable = enable;
        return this;
    }

    setGap(gap, min, max) {
        if (gap && (min !== undefined)) {
            gap = gap / (max - min);
        }

        this.gap = gap;
        return this;
    }

    setTick(tick, min, max) {
        this.setGap(tick, min, max);
        return this;
    }

    get tick() {
        return this.gap;
    }

    set tick(value) {
        this.gap = value;
    }

    setThumbOffset(x, y) {
        this.thumbOffsetX = x;
        this.thumbOffsetY = y;
        return this;
    }

    // Override
    get value() {
        return this._value;
    }

    // Override
    set value(value) {
        if (this.gap !== undefined) {
            value = SnapTo(value, this.gap);
        }
        var oldValue = this._value;
        this._value = Clamp(value, 0, 1);

        if (oldValue !== this._value) {
            this.updateThumb(this._value);
            this.updateIndicator(this._value);
            this.eventEmitter.emit('valuechange', this._value, oldValue, this.eventEmitter);
        }
    }

    postLayout(parent, newWidth, newHeight) {
        this.updateThumb();
        this.updateIndicator();
        super.postLayout(parent, newWidth, newHeight);
        return this;
    }
}

var methods = {
    getStartPoint: GetStartPoint,
    getEndPoint: GetEndPoint,
    updateThumb: UpdateThumb,
    updateIndicator: UpdateIndicator,
}

Object.assign(
    Slider.prototype,
    methods,
);

export default Slider;