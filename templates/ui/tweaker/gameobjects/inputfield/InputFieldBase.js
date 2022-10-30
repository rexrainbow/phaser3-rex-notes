var InputFiledBase = function (BaseClass) {
    class Base extends BaseClass {
        onValueChange() {
            // Fire 'valuechange' event to trigger object updating of InputRow class
            this.emit('valuechange', this.value);
        }

        // Override
        get value() {
            return this._value;
        }

        // Override
        set value(value) {
            this._value = value;
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