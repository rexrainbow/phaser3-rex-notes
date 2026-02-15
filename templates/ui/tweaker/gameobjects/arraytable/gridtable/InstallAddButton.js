var InstallAddButton = function (config) {
    var button = config.addButton;
    var createDefaultItemCallback = button.createDefaultItem;

    button.onClick(function () {
        var item = createDefaultItemCallback();
        this.addItem(item);
    }, this)
}

export default InstallAddButton;