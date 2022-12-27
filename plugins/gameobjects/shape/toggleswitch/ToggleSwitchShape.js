import BaseShapes from '../shapes/BaseShapes.js';
import Methods from './methods/Methods.js';
import GrayScale from '../../../utils/color/GrayScale.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const DefaultTrackFillColor = 0x005cb2;
const DefaultThumbFillColor = 0xffffff;

class ToggleSwitchShape extends BaseShapes {
    constructor(scene, x, y, width, height, color, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 2);
            height = GetValue(config, 'height', 2);
            color = GetValue(config, 'color', DefaultTrackFillColor);
        } else if (IsPlainObject(color)) {
            config = color;
            color = GetValue(config, 'color', DefaultTrackFillColor);
        }

        super(scene, x, y, width, height);
        this.type = 'rexToggleSwitch';

        if (color === undefined) {
            color = DefaultTrackFillColor;
        }

        this.setTrackFillStyle(
            color,
            GetValue(config, 'trackFillAlpha', 1)
        );

        this.setUncheckedTrackFillStyle(
            GetValue(config, 'uncheckedColor', GrayScale(color)),
            GetValue(config, 'uncheckedTrackFillAlpha', 1)
        )

        this.setTrackStrokeStyle(
            GetValue(config, 'trackLineWidth', 4),
            GetValue(config, 'trackStrokeColor', null),
            GetValue(config, 'trackStrokeAlpha', 1)
        );

        this.setUncheckedTrackStrokeStyle(
            this.trackLineWidth,
            GetValue(config, 'uncheckedTrackStrokeColor', this.trackStrokeColor),
            GetValue(config, 'uncheckedTrackStrokeAlpha', this.trackStrokeAlpha)
        );

        this.setThumbStyle(
            GetValue(config, 'thumbColor', DefaultThumbFillColor),
            GetValue(config, 'thumbAlpha', 1)
        );

        this.setThumbStrokeStyle(
            GetValue(config, 'thumbLineWidth', 2),
            GetValue(config, 'thumbStrokeColor', null),
            GetValue(config, 'thumbStrokeAlpha', 1)
        );

        this.setTrackSize(
            GetValue(config, 'trackWidth', 0.9),
            GetValue(config, 'trackHeight', 0.5),
        );

        this.setTrackConerRadius(
            GetValue(config, 'trackConerRadius', this.trackHeight / 2)
        );

        this.setThumbSize(
            GetValue(config, 'thumbWidth', this.trackHeight * 0.9),
            GetValue(config, 'thumbHeight', undefined),
        );

        this.setThumbConerRadius(
            GetValue(config, 'thumbConerRadius', this.thumbHeight / 2)
        );

        this.setThumbPosition(
            GetValue(config, 'thumbLeft', 0.3),
            GetValue(config, 'thumbRight', 0.7),
        )

        this.setToggleAnimationDuration(
            GetValue(config, 'animationDuration', 150)
        );

        this.buildShapes();

        this.setValue(GetValue(config, 'value', false), 0);

    }

    get value() {
        return this._value;
    }

    set value(value) {
        value = !!value;

        if (this._value === value) {
            return;
        }

        this.dirty = true;
        this._value = value;

        this.playToggleAnimation();

        this.emit('valuechange', value);
    }

    setValue(value, duration) {
        if (duration === undefined) {
            duration = this.toggleAnimDuration;
        }

        var durationSave = this.toggleAnimDuration;
        this.toggleAnimDuration = duration;

        this.value = value;

        this.toggleAnimDuration = durationSave;
        return this;
    }

    toggleValue(duration) {
        this.setValue(!this.value, duration);
        return this;
    }

    get toggleAnimProgress() {
        return this._toggleAnimProgress;
    }

    set toggleAnimProgress(value) {
        if (this._toggleAnimProgress === value) {
            return;
        }

        this._toggleAnimProgress = value;
        this.dirty = true;
    }
}

Object.assign(
    ToggleSwitchShape.prototype,
    Methods,
)

export default ToggleSwitchShape;