var Collapse = function () {
    if (this.root.easeOut) {
        this.scaleDownDestroy(this.root.easeOut);
    } else {
        this.destroy();
    }
    this.collapseSubMenu();
    return this;
}
export default Collapse;