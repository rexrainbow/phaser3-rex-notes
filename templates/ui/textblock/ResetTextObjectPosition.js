var ResetTextObjectPosition = function () {
    var config = this.textObject.rexSizer;
    this.textObject.y += (config.offsetY - config.preOffsetY);
    config.preOffsetY = config.offsetY;
    this.resetChildState(this.textObject);
}
export default ResetTextObjectPosition;