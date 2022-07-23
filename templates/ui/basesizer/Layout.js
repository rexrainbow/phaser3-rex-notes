var Layout = function () {
    // Save scale
    var scaleXSave = this.scaleX;
    var scaleYSave = this.scaleY;
    this.setScale(1);

    // Run layout with scale = 1
    this.runLayout();

    // Restore scale
    this.setScale(scaleXSave, scaleYSave);
    return this;
}
export default Layout;