var InputFiledBase = function (BaseClass) {
    class Base extends BaseClass {
        get value() {
            return this._value;
        }

        // Override
        set value(value) {
            if (this._value === value) {
                return;
            }

            this._value = value;
            this.emit('valuechange', value);
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
    }
    return Base;
}

export default InputFiledBase;