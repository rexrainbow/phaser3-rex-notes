var InstallAddButton = function (config) {
    var button = config.addButton;
    if (!button) {
        return;
    }

    var createDefaultItemCallback = button.createDefaultItem;

    button.onClick(function () {
        var item = createDefaultItemCallback();
        this.addItemWithTransition(item);
    }, this)
}

export default InstallAddButton;
