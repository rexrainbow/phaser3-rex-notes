import BaseShapes from '../shapes/BaseShapes.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const DefaultBoxFillColor = 0x005cb2;

class CheckboxShape extends BaseShapes {
    constructor(scene, x, y, width, height, color, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 2);
            height = GetValue(config, 'height', 2);
            color = GetValue(config, 'color', DefaultBoxFillColor);
        } else if (IsPlainObject(color)) {
            config = color;
            color = GetValue(config, 'color', DefaultBoxFillColor);
        }

        super(scene, x, y, width, height);
        this.type = 'rexCheckbox';

        if (color === undefined) {
            color = DefaultBoxFillColor;
        }

        this.setBoxShape(
            GetValue(config, 'circleBox', false),
        );

        this.setBoxFillStyle(
            color,
            GetValue(config, 'boxFillAlpha', 1)
        );

        this.setUncheckedBoxFillStyle(
            GetValue(config, 'uncheckedColor', null),
            GetValue(config, 'uncheckedBoxFillAlpha', 1)
        )

        this.setBoxStrokeStyle(
            GetValue(config, 'boxLineWidth', 4),
            GetValue(config, 'boxStrokeColor', color),
            GetValue(config, 'boxStrokeAlpha', 1)
        );

        this.setUncheckedBoxStrokeStyle(
            this.boxLineWidth,
            GetValue(config, 'uncheckedBoxStrokeColor', this.boxStrokeColor),
            GetValue(config, 'uncheckedBoxStrokeAlpha', this.boxStrokeAlpha)
        );


        this.setCheckerStyle(
            GetValue(config, 'checkerColor', 0xffffff),
            GetValue(config, 'checkerAlpha', 1)
        );

        this.setCheckerAnimDuration(
            GetValue(config, 'animationDuration', 150)
        );

        this.buildShapes();

        this.setChecked(
            GetValue(config, 'checked', false)
        )
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

        if (value) {
            this.playCheckerAnimation();
        } else {
            this.stopCheckerAnimation();
        }

        this.emit('valuechange', value);
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    get checked() {
        return this.value;
    }

    set checked(value) {
        this.value = value;
    }

    setChecked(checked) {
        if (checked === undefined) {
            checked = true;
        }
        this.checked = checked;
        return this;
    }

    toggleChecked() {
        this.checked = !this.checked;
        return this;
    }

    get checkerAnimProgress() {
        return this._checkerAnimProgress;
    }

    set checkerAnimProgress(value) {
        if (this._checkerAnimProgress === value) {
            return;
        }

        this._checkerAnimProgress = value;
        this.dirty = true;
    }
}

Object.assign(
    CheckboxShape.prototype,
    Methods,
)

export default CheckboxShape;