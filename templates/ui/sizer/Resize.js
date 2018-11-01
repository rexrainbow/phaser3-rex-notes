var Resize = function (width, height) {
    this.setSize(width, height);
    this.updateDisplayOrigin(); // Remove this line until it has merged in `zone.setSize()` function
    return this;
}
export default Resize;