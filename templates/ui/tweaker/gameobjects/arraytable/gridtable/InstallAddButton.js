var InstallAddButton = function (config) {
    // this: ArrayTable
    var button = config.addButton;
    if (!button) {
        return;
    }

    // See utils/CreateAddButton.js
    var createDefaultItemCallback = button.createDefaultItem;

    button.onClick(function () {
        if (this.readOnly) {
            return;
        }

        var item = createDefaultItemCallback();
        this.addItemWithTransition(item);
    }, this)
}

export default InstallAddButton;
