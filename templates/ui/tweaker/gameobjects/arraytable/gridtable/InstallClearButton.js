var InstallClearButton = function (config) {
    var button = config.clearButton;
    if (!button) {
        return;
    }

    button.onClick(function () {
        this.clearItems();
    }, this)
}

export default InstallClearButton;
