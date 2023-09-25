import Sizer from '../../../sizer/Sizer.js';

var GenerateInputFieldClass = function (BaseClass) {
    if (BaseClass === undefined) {
        BaseClass = Sizer;
    }

    class InputFiled extends BaseClass {
        get bindingTarget() {
            return this.getParentSizer().bindingTarget;
        }

        get bindingKey() {
            return this.getParentSizer().bindTargetKey;
        }

        get value() {
            return this._value;
        }

        validate(newValue) {
            if (this.syncValueFlag || !this.validateCallback) {
                return true;
            }
            return this.validateCallback(newValue, this._value, this.bindingTarget, this.bindingKey);
        }

        getFotmatText(value) {
            if (this.textFormatCallback) {
                value = this.textFormatCallback(value);
            } else {
                value = value.toString();
            }
            return value;
        }

        set value(value) {
            if (this._value === value) {
                return;
            }
            if (!this.validate(value)) {
                value = this._value;  // Back to previous value
            }

            if (this.displayValueCallback) {
                this.displayValueCallback(this, value)
            }

            if (this._value === value) {
                return;
            }

            var oldValue = this._value;
            this._value = value;

            if (!this.syncValueFlag) {
                this.emit('valuechange', value, oldValue, this.bindingTarget, this.bindingKey);
            }
        }

        getValue() {
            return this.value;
        }

        setValue(value) {
            this.value = value;
            return this;
        }

        /* 
        Internal method invoked when 
        - inputRow.setBindingTarget(target), or 
        - inputRow.syncTargetValue()
        */
        syncValue(value) {
            this.syncValueFlag = true;
            this.value = value;
            this.syncValueFlag = false;

            return this;
        }

        setup(config, setDefaults) {
            if (setDefaults === undefined) {
                setDefaults = false;
            }

            if (setDefaults || config.hasOwnProperty('format')) {
                this.setTextFormatCallback(config.format);
            }

            if (setDefaults || config.hasOwnProperty('onValidate')) {
                this.setValidateCallback(config.onValidate);
            }

            if (this.setupCallback) {
                this.setupCallback(this, config, setDefaults);
            }

            return this;
        }

        setSetupCallback(callback) {
            this.setupCallback = callback;
            return this;
        }

        setDisplayValueCallback(callback) {
            this.displayValueCallback = callback;
            return this;
        }

        setTextFormatCallback(callback) {
            this.textFormatCallback = callback;
            return this;
        }

        setValidateCallback(callback) {
            this.validateCallback = callback;
            return this;
        }
    }

    return InputFiled;
}

export default GenerateInputFieldClass;