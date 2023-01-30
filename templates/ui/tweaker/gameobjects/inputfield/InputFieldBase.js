import Sizer from '../../../sizer/Sizer.js';

class InputFiledBase extends Sizer {
    get bindingTarget() {
        return this.getParentSizer().bindingTarget;
    }

    get bindingKey() {
        return this.getParentSizer().bindTargetKey;
    }

    get value() {
        return this._value;
    }

    // Override
    set value(value) {
        if (this._value === value) {
            return;
        }

        var oldValue = this._value;
        var bindingTarget = this.bindingTarget;
        var bindingKey = this.bindingKey;

        this._value = value;
        this.emit('valuechange', value, oldValue, bindingTarget, bindingKey);
    }

    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
        return this;
    }

    // Override
    get readOnly() {
        return this._readOnly;
    }

    // Override
    set readOnly(value) {
        this._readOnly = value;
    }

    setReadOnly(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.readOnly = enable;
        return true;
    }

    setTextFormatCallback(callback) {
        this.textFormatCallback = callback;
        return this;
    }

}

export default InputFiledBase;