import Sizer from '../../../sizer/Sizer';

var GenerateInputFieldClass = function(BaseClass?: any) {
    if (BaseClass === undefined) {
        BaseClass = Sizer;
    }

    class InputFiled extends BaseClass {
    _readOnly: any;
    _value: any;
    displayValueCallback: any;
    emit: any;
    filterValueCallback: any;
    getParentSizer: any;
    onBindTargetCallback: any;
    setReadOnlyCallback: any;
    setupCallback: any;
    syncValueFlag: any;
    textFormatCallback: any;
    tweaker: any;
    validateCallback: any;

        get bindingTarget() {
            var inputRow = this.getParentSizer();
            return inputRow.bindingTarget;
        }

        get bindingKey() {
            var inputRow = this.getParentSizer();
            return inputRow.bindTargetKey;
        }

        get value() {
            return this._value;
        }

        get root() {
            return this.tweaker.root;
        }

        onBindTarget(target?: any, key?: any) {
            if (this.onBindTargetCallback) {
                this.onBindTargetCallback(this, target, key);
            }
        }

        validate(newValue?: any) {
            if (this.syncValueFlag || !this.validateCallback) {
                return true;
            }
            return this.validateCallback(newValue, this._value, this.bindingTarget, this.bindingKey);
        }

        getFotmatText(value?: any) {
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

            if (this.filterValueCallback) {
                value = this.filterValueCallback(this, value);
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
                var bindingTarget = this.bindingTarget;
                var bindingKey = this.bindingKey;
                // Emit event from this input field, current tweaker, and root tweaker
                this.emit('valuechange', value, oldValue, bindingTarget, bindingKey);
                this.tweaker.emit('valuechange', value, oldValue, bindingTarget, bindingKey);
                this.root.emit('valuechange', value, oldValue, bindingTarget, bindingKey);
            }
        }

        getValue() {
            return this.value;
        }

        setValue(value?: any) {
            this.value = value;
            return this;
        }

        /* 
        Internal method invoked when 
        - inputRow.setBindingTarget(target), or 
        - inputRow.syncTargetValue()
        */
        syncValue(value?: any) {
            this.syncValueFlag = true;
            this.value = value;
            this.syncValueFlag = false;

            return this;
        }

        setReadOnly(value?: any) {
            value = !!value;

            if (!this.setReadOnlyCallback) {
                return this;
            }

            this.setReadOnlyCallback(this, value);
            this._readOnly = value;

            return this;
        }

        get readOnly() {
            return this._readOnly;
        }

        set readOnly(value) {
            this.setReadOnly(value);
        }

        // Internal usage
        setTweaker(tweaker?: any) {
            this.tweaker = tweaker;
            return this;
        }

        setup(config?: any, setDefaults?: any) {
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

        setSetupCallback(callback?: any) {
            this.setupCallback = callback;
            return this;
        }

        setFilterValueCallback(callback?: any) {
            this.filterValueCallback = callback;
            return this;
        }

        setDisplayValueCallback(callback?: any) {
            this.displayValueCallback = callback;
            return this;
        }

        setOnBindTargetCallback(callback?: any) {
            this.onBindTargetCallback = callback;
            return this;
        }

        setTextFormatCallback(callback?: any) {
            this.textFormatCallback = callback;
            return this;
        }

        setValidateCallback(callback?: any) {
            this.validateCallback = callback;
            return this;
        }

        setSetReadOnlyCallback(callback?: any) {
            this.setReadOnlyCallback = callback;
            return this;
        }
    }

    return InputFiled;
}

export default GenerateInputFieldClass;