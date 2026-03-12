var InstallClearButton = function (config) {
    // this: ListTable

    var button = config.clearButton;
    if (!button) {
        return;
    }

    button.onClick(function () {
        if (this.readOnly) {
            return;
        }

        this.clearItemsWithTransition();
    }, this)
}

export default InstallClearButton;
