import BaseShapes from '../shapes/BaseShapes';
import Methods from './methods/Methods';
import GrayScale from '../../../utils/color/GrayScale';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const DefaultTrackFillColor = 0x005cb2;
const DefaultThumbFillColor = 0xffffff;

class ToggleSwitchShape extends BaseShapes {
    _toggleAnimProgress: any;
    _value: any;
    buildShapes: any;
    dirty: any;
    emit: any;
    playToggleAnimation: any;
    setFalseValueTrackFillStyle: any;
    setRTL: any;
    setThumbPosition: any;
    setThumbRadius: any;
    setThumbSize: any;
    setThumbStyle: any;
    setToggleAnimationDuration: any;
    setTrackFillStyle: any;
    setTrackRadius: any;
    setTrackSize: any;
    thumbHeight: any;
    toggleAnimDuration: any;
    trackHeight: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, width?: any, height?: any, color?: any, config?: any) {
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

        this.setFalseValueTrackFillStyle(
            GetValue(config, 'falseValueTrackColor', GrayScale(color)),
            GetValue(config, 'falseValueTrackFillAlpha', 1)
        )

        this.setThumbStyle(
            GetValue(config, 'thumbColor', DefaultThumbFillColor),
            GetValue(config, 'thumbAlpha', 1)
        );

        this.setTrackSize(
            GetValue(config, 'trackWidth', 0.9),
            GetValue(config, 'trackHeight', 0.5),
        );

        this.setTrackRadius(
            GetValue(config, 'trackRadius', this.trackHeight * 0.5)
        );

        var thumbHeight = GetValue(config, 'thumbHeight', undefined);
        var thumbWidth = GetValue(config, 'thumbWidth', thumbHeight);
        if (thumbWidth === undefined) {
            thumbWidth = this.trackHeight * 0.9;
        }
        this.setThumbSize(thumbWidth, thumbHeight);

        this.setThumbRadius(
            GetValue(config, 'thumbRadius', this.thumbHeight * 0.5)
        );

        this.setThumbPosition(
            GetValue(config, 'thumbLeft', 0.3),
            GetValue(config, 'thumbRight', undefined),
        )

        this.setRTL(GetValue(config, 'rtl', false));

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

    setValue(value?: any, duration?: any) {
        if (duration === undefined) {
            duration = this.toggleAnimDuration;
        }

        var durationSave = this.toggleAnimDuration;
        this.toggleAnimDuration = duration;

        this.value = value;

        this.toggleAnimDuration = durationSave;
        return this;
    }

    toggleValue(duration?: any) {
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