const GetValue = Phaser.Utils.Objects.GetValue;

var InitData = function (config, initialValue) {
    if (initialValue === undefined) {
        initialValue = false;
    }

    var dataManager = GetValue(config, 'dataManager', undefined);
    var setValueCallback, setValueCallbackScope;
    setValueCallback = GetValue(config, 'setValueCallback', undefined);
    setValueCallbackScope = GetValue(config, 'setValueCallbackScope', undefined);
    if (setValueCallback === undefined) {
        setValueCallback = GetValue(config, 'setButtonStateCallback', undefined);
        setValueCallbackScope = GetValue(config, 'setButtonStateCallbackScope', undefined);
    }

    if (dataManager === undefined) {
        var parent = this.parent;
        parent.setDataEnabled();
        dataManager = parent.data;
    }

    this.buttons.forEach(function (button) {
        var key = button.name;

        if (setValueCallback) {
            dataManager.events.on(`changedata-${key}`, function (parent, value, previousValue) {
                if (setValueCallbackScope) {
                    setValueCallback.call(setValueCallbackScope, button, value, previousValue);
                } else {
                    setValueCallback(button, value, previousValue);
                }
            })
        }

        dataManager.set(key, undefined);
        dataManager.set(key, initialValue); // Trigger data event 'changedata'
    })
    this.dataManager = dataManager;
}

export default {
    setType(config) {
        var type = GetValue(config, 'type', undefined);
        this.buttonsType = type;
        switch (type) {
            case 'radio':
                this.setRadioType(config);
                break;
            case 'checkboxes':
                this.setCheckboxesType(config);
                break;
        }

        return this;
    },

    setRadioType(config) {
        InitData.call(this, config);

        var radioValue = undefined;
        var parent = this.parent,
            buttons = this.buttons,
            dataManager = this.dataManager;
        Object.defineProperty(parent, 'value', {
            get: function () {
                return radioValue;
            },
            set: function (newValue) {
                if (newValue === radioValue) {
                    return;
                }
                radioValue = newValue;
                // Update state of button -> Fire `changedata-btnName` event -> setValueCallback                
                buttons.forEach(function (button) {
                    var key = button.name;
                    var state = dataManager.get(key);
                    if (key === newValue) {
                        if (!state) {
                            dataManager.set(key, true);
                        }
                    } else {
                        if (state) {
                            dataManager.set(key, false);
                        }
                    }
                });
            },
            enumerable: true,
            configurable: true
        });

        parent.on('button.click', function (button) {
            parent.value = button.name;
        });

        return this;
    },

    setCheckboxesType(config) {
        InitData.call(this, config);

        var parent = this.parent,
            dataManager = this.dataManager;
        parent.on('button.click', function (button) {
            dataManager.toggle(button.name);
        });

        return this;
    },

    // For radio
    setSelectedButtonName(name) {
        this.parent.value = name;
        return this;
    },

    getSelectedButtonName() {
        return this.parent.value;
    },

    // For checkboxes
    setButtonState(name, state) {
        if (state === undefined) {
            state = true;
        }
        this.dataManager.set(name, state);
        return this;
    },

    getButtonState(name) {
        return this.dataManager.get(name);
    }
}