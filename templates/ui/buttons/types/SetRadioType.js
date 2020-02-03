import InitData from './InitData.js';

var SetRadioType = function (config) {
    InitData.call(this, config);

    this.on('button.click', function (button) {
        var dataManager = this._dataManager;
        this.getElement('buttons').forEach(function (btn) {
            var key = btn.name;
            var value = dataManager.get(key);
            if (btn === button) {
                if (!value) {
                    dataManager.set(key, true);
                }
            } else { // btn !== button
                if (value) {
                    dataManager.set(key, false);
                }
            }
        }, this);
    }, this);
}

export default SetRadioType;