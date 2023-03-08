const GetValue = Phaser.Utils.Objects.GetValue;

var Initialize = function (config) {
    // Assign this.dataManager
    var dataManager = GetValue(config, 'dataManager', undefined);
    if (dataManager === undefined) {
        var parent = this.parent;
        parent.setDataEnabled();
        dataManager = parent.data;
    }
    this.dataManager = dataManager;

    // Assign this.setValueCallback, this.setValueCallbackScope
    var setValueCallback, setValueCallbackScope;
    setValueCallback = GetValue(config, 'setValueCallback', undefined);
    setValueCallbackScope = GetValue(config, 'setValueCallbackScope', undefined);
    if (setValueCallback === undefined) {
        setValueCallback = GetValue(config, 'setButtonStateCallback', undefined);
        setValueCallbackScope = GetValue(config, 'setButtonStateCallbackScope', undefined);
    }
    this.setValueCallback = setValueCallback;
    this.setValueCallbackScope = setValueCallbackScope;

    // Register event callback
    dataManager.events.on(`changedata`, function (parent, key, value, previousValue) {
        var button = this.buttonMap[key];
        if (!button) {
            return;
        }

        var callback = this.setValueCallback;
        var scope = this.setValueCallbackScope;
        if (callback) {
            if (scope) {
                callback.call(scope, button, value, previousValue);
            } else {
                callback(button, value, previousValue);
            }
        }

        this.fireEvent('button.statechange', button, value, previousValue);
    }, this)
}

export default {
    setButtonsType(config) {
        if (config === undefined) {
            config = {};
        }

        var buttonsType = GetValue(config, 'buttonsType', config.type);
        this.buttonsType = buttonsType;
        switch (buttonsType) {
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
        Initialize.call(this, config);

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
        // button.click event -> parent.value -> dataManager -> changedata event -> ...
        // parent.value -> dataManager -> changedata event -> ...

        return this;
    },

    setCheckboxesType(config) {
        Initialize.call(this, config);

        var parent = this.parent,
            dataManager = this.dataManager;
        parent.on('button.click', function (button) {
            dataManager.toggle(button.name);
        });
        // button.click event -> dataManager -> changedata event -> ...
        // dataManager.set() -> changedata event -> ...

        return this;
    },

    // Common
    clearAllButtonsState() {
        for (var key in this.buttonMap) {
            this.dataManager.set(key, false);
        }
        return this;
    },

    getAllButtonsState() {
        var states = {}
        for (var key in this.buttonMap) {
            states[key] = this.dataManager.get(key);
        }
        return states;
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