import InitData from './InitData.js';

var SetCheckboxesType = function (config) {
    InitData.call(this, config);

    this.on('button.click', function (button) {
        var dataManager = this._dataManager;
        var key = button.name;
        var value = dataManager.get(key);
        dataManager.set(key, !value);
    }, this);
}

export default SetCheckboxesType;