import OverlapSizer from '../overlapsizer/OverlapSizer.js';
import CircularProgress from '../circularprogress/CircularProgress.js';
import OnTouchPad from './OnTouchPad.js';
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
        }
        // Create circular progress object
        var knob = new CircularProgress(scene, config);
        knob.setDepth(GetValue(config, 'knobDepth', 0));
        knob._value = -1; // To trigger text updating
        scene.add.existing(knob);

        this.add(knob, 'knob');
        this.setTextObject(textObject);

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
        var inputMode = GetValue(config, 'input', true);
        if (inputMode) {
            knob.setInteractive()
                .on('pointerdown', OnTouchPad, this)
                .on('pointermove', OnTouchPad, this);
        }
    }

    setTextObject(textObject) {
        if (textObject === this.sizerChildren.text) {
            return this;
        }
        this.remove('text', true);
        if (textObject) {
            this.add(textObject, 'text', 'center', 0, false);
        }
        return this;
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
            // Update text/label element            
            var textObject = this.sizerChildren.text;
            if (textObject) {
                var text = this.sizerChildren.knob.getFormatText();
                textObject.setText(text);
            }
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

Object.assign(
    Knob.prototype,
    EaseValueMethods
);

export default Knob;