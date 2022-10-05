var SetValueTextFormatCallback = function (callback, scope) {
    this.valueTextFormatCallback = callback;
    this.valueTextFormatCallbackScope = scope;
    return this;
}

var GetFormatValueText = function (value, min, max) {
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
}

var UpdateValueText = function (value, min, max) {
    var textObject = this.childrenMap.value;
    if (textObject && this.valueTextFormatCallback) {
        textObject.setText(GetFormatValueText.call(this, value, min, max));
        if (textObject.layout) {
            textObject.layout();
        }
    }
    return this;
}

const Clamp = Phaser.Math.Clamp;
var SetValue = function (value, min, max) {
    value = Clamp(value, min, max);
    this.value = value;
    this.minValue = min;
    this.maxValue = max;
    this.updateValueText(value, min, max);
    this.setBarValue(value, min, max);
    return this;
}

export default {
    setValueTextFormatCallback: SetValueTextFormatCallback,
    getFormatValueText: GetFormatValueText,
    updateValueText: UpdateValueText,
    setValue: SetValue,
}