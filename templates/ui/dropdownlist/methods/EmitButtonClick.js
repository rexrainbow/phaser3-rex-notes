var EmitListButtonClick = function (index) {
    if (index === undefined) {
        index = this.currentOverIndex;
    }

    if (index === undefined) {
        return this;
    }

    var listPanel = this.listPanel;

    // Use option if listPanel is not created.
    var button = (listPanel) ? listPanel.getButton(index) : this.options[index];

    if (this.listOnButtonClick) {
        this.listOnButtonClick.call(this, button, index);
    }
    this.emit('button.click', this, listPanel, button, index);

    return this;
}

export default EmitListButtonClick;