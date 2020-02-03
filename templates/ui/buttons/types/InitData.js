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

    if (setValueCallback) {
        dataManager.events.on('changedata', function (parent, key, value) {
            var button = this.getElement(`#${key}`);
            if (!button) {
                return;
            }

            if (setValueCallbackScope) {
                setValueCallback.call(setValueCallbackScope, button, value);
            } else {
                setValueCallback(button, value);
            }
        }, this)
    }

    this.childrenMap.buttons.forEach(function (button) {
        var key = button.name;
        dataManager.set(key, undefined);
        dataManager.set(key, initialValue); // Trigger data event 'changedata'
    })
    this._dataManager = dataManager;
}

export default InitData;