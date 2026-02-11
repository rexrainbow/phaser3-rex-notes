import GetValue from '../../../../../plugins/utils/object/GetValue.js';
import SetValue from '../../../../../plugins/utils/object/SetValue.js';

export default {
    setupBinding() {
        var inputField = this.childrenMap.inputField;
        inputField
            // Set text value to object when closing editor
            .on('valuechange', function (value) {
                if (!this.autoUpdateEnable) {
                    return;
                }

                this.setTargetValue(value);
            }, this);

        return this;
    },

    setAutoUpdateEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.autoUpdateEnable = enable;
        return this;
    },

    setBindingTarget(target, bindingKey) {
        this.bindingTarget = target;

        if (bindingKey !== undefined) {
            this.setBindingTargetKey(bindingKey);
        }

        this.syncTargetValue();

        var inputField = this.childrenMap.inputField;
        if (inputField.onBindTarget) {
            inputField.onBindTarget(target, bindingKey);
        }

        return this;
    },

    setBindingTargetKey(bindingKey) {
        this.bindTargetKey = bindingKey;
        return this;
    },

    setValueCallbacks(config) {
        this.onGetValue = GetValue(config, 'onGetValue');
        this.onSetValue = GetValue(config, 'onSetValue');
        return this;
    },

    getTargetValue() {
        if (!this.bindingTarget) {
            return undefined;
        }

        if (this.bindTargetKey != null) {
            return GetValue(this.bindingTarget, this.bindTargetKey);
        }

        if (this.onGetValue) {
            return this.onGetValue(this.bindingTarget);
        }

        return undefined;
    },

    setTargetValue(value) {
        if (!this.bindingTarget) {
            return this;
        }

        if (this.bindTargetKey != null) {
            SetValue(this.bindingTarget, this.bindTargetKey, value);
            return this;
        }

        if (this.onSetValue) {
            this.onSetValue(this.bindingTarget, value);
        }
        return this;
    },

    syncTargetValue() {
        if (!this.bindingTarget) {
            return this;
        }

        var inputField = this.childrenMap.inputField;
        if (inputField.syncValue) {
            inputField.syncValue(this.getTargetValue());
        } else {
            // Buttons does not have syncValue method
        }

        return this;
    },
}
