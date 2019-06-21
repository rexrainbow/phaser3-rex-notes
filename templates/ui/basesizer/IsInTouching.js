var IsInTouching = function (pointer) {
    if (globRect === undefined) {
        globRect = new Phaser.Geom.Rectangle();
    }
    this.getBounds(globRect);
    return globRect.contains(pointer.x, pointer.y);
}

var globRect = undefined;

export default IsInTouching;