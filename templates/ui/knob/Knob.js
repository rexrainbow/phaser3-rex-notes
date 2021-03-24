import OverlapSizer from '../overlapsizer/OverlapSizer.js';
import CircularProgress from '../circularprogress/CircularProgress.js';
import InstallTouchPadEvents from './input/OnTouchPad.js';
import InstallPanPadEvents from './input/OnPanPad.js';
import TextObjectMethods from './TextObjectMethods.js';
import EaseValueMethods from '../utils/EaseValueMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Linear = Phaser.Math.Linear;
const Percent = Phaser.Math.Percent;
const SnapTo = Phaser.Math.Snap.To;

class Knob extends OverlapSizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        // Create sizer
        super(scene, config);
        this.type = 'rexKnob';
        this.eventEmitter = GetValue(config, 'eventEmitter', this);

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var textObject = GetValue(config, 'text', undefined);

        if (background) {
            this.addBackground(background);
        }
        // Get text object
        if (textObject) {
            // Don't draw text on knob directly
            config.textColor = undefined;
            config.textStrokeColor = undefined;
            this.setTextFormatCallback(
                GetValue(config, 'textFormatCallback', undefined),
                GetValue(config, 'textFormatCallbackScope', undefined)
            );
        }
        // Create circular progress object
        var knob = new CircularProgress(scene, config);
        knob.setDepth(GetValue(config, 'knobDepth', 0));
        knob._value = -1; // To trigger text updating
        scene.add.existing(knob);

        this.add(knob, 'knob');
        if (textObject) {
            this.add(textObject, 'text', 'center', 0, false);
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('knob', knob);
        this.addChildrenMap('text', textObject);

        var callback = GetValue(config, 'valuechangeCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'valuechangeCallbackScope', undefined);
            this.eventEmitter.on('valuechange', callback, scope);
        }
        this.setEnable(GetValue(config, 'enable', undefined));
        this.setEaseValueDuration(GetValue(config, 'easeValue.duration', 0));
        this.setEaseValueFunction(GetValue(config, 'easeValue.ease', 'Linear'));
        this.setGap(GetValue(config, 'gap', undefined));
        this.setValue(GetValue(config, 'value', 0), GetValue(config, 'min', undefined), GetValue(config, 'max', undefined));

        // Input
        var inputMode = GetValue(config, 'input', 0);
        if (typeof (inputMode) === 'string') {
            inputMode = INPUTMODE[inputMode];
        }
        switch (inputMode) {
            case 0: // 'pan'
                InstallPanPadEvents.call(this);
                break;
            case 1: // 'click'
                InstallTouchPadEvents.call(this);
                break;
        }
    }

    setEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.enable = enable;
        return this;
    }

    setGap(gap) {
        this.gap = gap;
        return this;
    }

    get value() {
        return this.sizerChildren.knob.value;
    }

    set value(value) {
        if (this.gap !== undefined) {
            value = SnapTo(value, this.gap);
        }
        var oldValue = this.value;
        this.sizerChildren.knob.value = value;

        var newValue = this.value;
        if (oldValue !== newValue) {
            this.updateText();
            this.eventEmitter.emit('valuechange', newValue, oldValue, this.eventEmitter);
        }
    }

    setValue(value, min, max) {
        if ((value === undefined) || (value === null)) {
            return this;
        }

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

const INPUTMODE = {
    pan: 0,
    click: 1,
    none: -1,
}

Object.assign(
    Knob.prototype,
    TextObjectMethods,
    EaseValueMethods
);

export default Knob;