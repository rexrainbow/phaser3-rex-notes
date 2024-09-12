const GetValue = Phaser.Utils.Objects.GetValue;

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

    setBindingTarget(target, key) {
        this.bindingTarget = target;

        if (key !== undefined) {
            this.setBindingTargetKey(key);
        }

        this.syncTargetValue();

        var inputField = this.childrenMap.inputField;
        if (inputField.onBindTarget) {
            inputField.onBindTarget(target, key);
        }

        return this;
    },

    setBindingTargetKey(key) {
        this.bindTargetKey = key;
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
            return this.bindingTarget[this.bindTargetKey];
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
            this.bindingTarget[this.bindTargetKey] = value;
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