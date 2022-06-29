var CloseListPanel = function () {
    if (!this.listPanel) {
        return this;
    }

    var listPanel = this.listPanel;
    this.listPanel = undefined;

    var duration = this.listEaseOutDuration;
    // Don't destroy under transitOutCallback
    this.listTransitOutCallback(listPanel, duration);
    // Destroy by delayCall
    this.delayCall(duration, function () {
        this.emit('list.close', this, listPanel);
        listPanel.destroy();
    }, this);

    return this;
}

export default CloseListPanel;