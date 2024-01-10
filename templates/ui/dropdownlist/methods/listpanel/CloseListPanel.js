var CloseListPanel = function () {
    if (!this.dropDownBehavior) {
        return this;
    }

    this.dropDownBehavior.requestClose();
    this.currentOverIndex = undefined;

    return this;
}

export default CloseListPanel;