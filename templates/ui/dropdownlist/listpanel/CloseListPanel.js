var CloseListPanel = function () {
    if (!this.listPanel) {
        return this;
    }

    this.listPanel.scaleDownDestroy(this.listEaseOutDuration, 'y', 'Linear');
    this.listPanel = undefined;

    return this;
}

export default CloseListPanel;