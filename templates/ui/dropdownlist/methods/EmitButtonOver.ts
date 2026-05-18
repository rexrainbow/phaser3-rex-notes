var EmitButtonOver = function(index?: any) {
    var listPanel = this.listPanel;
    if (!listPanel) {
        return this;
    }

    listPanel.emitButtonOver(index);

    return this;
}

export default EmitButtonOver;