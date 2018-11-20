var Collapse = function () {
    if (this.root.easeOut) {
        this.scaleDownDestroy(this.root.easeOut);
    } else {
        this.destroy();
    }
    return this;
}
export default Collapse;