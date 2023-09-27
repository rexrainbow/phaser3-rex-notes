var Layout = function () {
    // Save scale
    var scaleXSave = this.scaleX;
    var scaleYSave = this.scaleY;
    var scale1 = (scaleXSave === 1) && (scaleYSave === 1);
    if (!scale1) {
        this.setScale(1);
    }

    // Run layout with scale = 1
    this.runLayout();

    // Custom postLayout callback
    this.postLayout();

    this._postLayout();

    // Restore scale
    if (!scale1) {
        this.setScale(scaleXSave, scaleYSave);
    }
    return this;
}
export default Layout;