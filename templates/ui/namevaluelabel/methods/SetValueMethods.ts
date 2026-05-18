import EaseValueTask from '../../../../plugins/utils/ease/EaseValueTask';

import { Math as PhaserMath } from 'phaser';
const Clamp = PhaserMath.Clamp;

export default {
    setValueTextFormatCallback(callback?: any, scope?: any) {
        this.valueTextFormatCallback = callback;
        this.valueTextFormatCallbackScope = scope;
        return this;
    },

    getFormatValueText(value?: any, min?: any, max?: any) {
        if (value === undefined) {
            value = this.value;
        }
        if (min === undefined) {
            min = this.minValue;
        }
        if (max === undefined) {
            max = this.maxValue;
        }

        var text;
        if (this.valueTextFormatCallbackScope) {
            text = this.valueTextFormatCallback(value, min, max);
        } else {
            text = this.valueTextFormatCallback.call(this.valueTextFormatCallbackScope, value, min, max);
        }
        return text;
    },

    updateValueText(value?: any, min?: any, max?: any) {
        var textObject = this.childrenMap.value;
        if (textObject && this.valueTextFormatCallback) {
            textObject.setText(this.getFormatValueText(value, min, max));
            if (textObject.layout) {
                textObject.layout();
            }
        }
        return this;
    },

    setValue(value?: any, min?: any, max?: any) {
        if (min === undefined) {
            min = this.minValue;
        } else {
            this.minValue = min;
        }
        if (max === undefined) {
            max = this.maxValue;
        } else {
            this.maxValue = max;
        }

        value = Clamp(value, min, max);
        this.value = value;
        this.updateValueText(value, min, max);
        this.setBarValue(value, min, max);
        return this;
    },

    setEaseValueDuration(duration?: any) {
        this.easeValueDuration = duration;
        return this;
    },

    easeValueTo(value?: any, min?: any, max?: any) {
        if (min === undefined) {
            min = this.minValue;
        } else {
            this.minValue = min;
        }
        if (max === undefined) {
            max = this.maxValue;
        } else {
            this.maxValue = max;
        }

        if (this.easeValueTask === undefined) {
            this.easeValueTask = new EaseValueTask(this);
            this.easeValueTask.on('update', function() {
                this.setValue(this.value, this.minValue, this.maxValue);
            }, this)
        }

        this.easeValueTask.restart({
            key: 'value',
            to: value,
            duration: this.easeValueDuration,
        });

        return this;
    },
}