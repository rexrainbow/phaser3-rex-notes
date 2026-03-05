var InstallClearButton = function (config) {
    var button = config.clearButton;
    if (!button) {
        return;
    }

    button.onClick(function () {
        this.clearItemsWithTransition();
    }, this)
}

export default InstallClearButton;
