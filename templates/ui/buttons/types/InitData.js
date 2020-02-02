const GetValue = Phaser.Utils.Objects.GetValue;

var InitData = function (config) {
    var dataManager = GetValue(config, 'dataManager', this.data);
    var buttons = this.childrenMap.buttons, button;
    for (var i = 0, cnt = buttons.length; i < cnt; i++) {
        button = buttons[i];
        dataManager.set(button.name, false);
    }
}

export default InitData;