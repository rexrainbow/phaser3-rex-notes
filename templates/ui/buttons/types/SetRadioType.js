import InitData from './InitData.js';

var SetRadioType = function (config) {
    InitData.call(this, config);

    var selectedValue = undefined;
    Object.defineProperty(this, 'value', {
        get: function () {
            return selectedValue;
        },
        set: (function (value) {
            if (value === selectedValue) {
                return;
            }

            selectedValue = value;

            // Update state of button -> Fire `changedata-btnName` event -> setValueCallback
            var dataManager = this._dataManager;
            this.getElement('buttons').forEach(function (button) {
                var key = button.name;
                var state = dataManager.get(key);
                if (key === value) {
                    if (!state) {
                        dataManager.set(key, true);
                    }
                } else {
                    if (state) {
                        dataManager.set(key, false);
                    }
                }
            });
        }).bind(this),
        enumerable: true,
        configurable: true
    });

    this.on('button.click', function (button) {
        this.value = button.name;
    }, this);

}

export default SetRadioType;