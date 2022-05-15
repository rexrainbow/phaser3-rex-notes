var CloseListPanel = function () {
    if (!this.listPanel) {
        return this;
    }

    var listPanel = this.listPanel;
    this.listPanel = undefined;

    listPanel
        .scaleDownDestroy(this.listEaseOutDuration, 'y', 'Linear')
        .once('scaledown.complete', function () {
            this.emit('list.close', this, listPanel);
        }, this);

    return this;
}

export default CloseListPanel;