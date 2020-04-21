const GetValue = Phaser.Utils.Objects.GetValue;

var InitData = function (config, initialValue) {
    if (initialValue === undefined) {
        initialValue = false;
    }

    var dataManager = GetValue(config, 'dataManager', undefined);
    var setValueCallback = GetValue(config, 'setValueCallback', undefined);
    var setValueCallbackScope = GetValue(config, 'setValueCallbackScope', undefined);

    if (dataManager === undefined) {
        this.setDataEnabled();
        dataManager = this.data;
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
            }, this)
        }

        dataManager.set(key, undefined);
        dataManager.set(key, initialValue); // Trigger data event 'changedata'
    })
    this._dataManager = dataManager;
}

export default InitData;
