var Swap = function (key) {
    this.previousKey = this.currentKey;
    var prevoiusPage = this.previousPage;
    if (prevoiusPage) {
        this.remove(prevoiusPage);
        if (this.swapMode === 0) { // Invisible
            prevoiusPage.setVisible(false);
        } else { // Destroy
            prevoiusPage.destroy();
        }
    }

    if (key && !this.sizerChildren.has(key)) {
        var callback = this.createPageCallback;
        var scope = this.createPageCallbackScope;
        if (callback) {
            if (scope) {
                callback.call(scope, key, this);
            } else {
                callback(key, this);
            }
        }
    }

    this.currentKey = key;
    var currentPage = this.currentPage;
    if (currentPage) {
        currentPage.setVisible(true);
        this.add(currentPage);
    }
    return this;
}

export default Swap;