var SwapPage = function (key) {
    this._previousKey = this._currentKey;
    var prevoiusPage = this.previousPage;
    if (prevoiusPage) {
        this.remove(prevoiusPage);
        if (this.swapMode === 0) { // Invisible
            prevoiusPage.setVisible(false);
            this.emit('pageinvisible', this._previousKey, this);
        } else { // Destroy
            prevoiusPage.destroy();
        }
    }

    if (key && !this.sizerChildren.has(key)) {
        this.emit('createpage', key, this);
    }

    this._currentKey = key;
    var currentPage = this.currentPage;
    if (currentPage) {
        currentPage.setVisible(true);
        this.emit('pagevisible', this._currentKey, this);
        this
            .add(currentPage)
            .layout();
    }
    return this;
}

export default SwapPage;