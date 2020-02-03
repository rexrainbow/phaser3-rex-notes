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
        var callback = function (parent, key, value) {
            var button = this.getElement(`#${key}`);
            if (!button) {
                return;
            }

            if (setValueCallbackScope) {
                setValueCallback.call(setValueCallbackScope, button, value);
            } else {
                setValueCallback(button, value);
            }
        }
        dataManager.events.on('setdata', callback, this)
        dataManager.events.on('changedata', callback, this)
    }

    this.childrenMap.buttons.forEach(function (button) {
        dataManager.set(button.name, initialValue);
    })
    this._dataManager = dataManager;
}

export default InitData;