const SetSizeBase = Phaser.GameObjects.Components.Size.setSize;
const SetOriginBase = Phaser.GameObjects.Components.Origin.setOrigin;

var SetSizeFromBounds = function () {
    var bounds = this.getBounds(true);

    SetSizeBase.call(this, bounds.width, bounds.height);

    var originX = (bounds.width === 0) ? 0.5 : (this.x - bounds.left) / bounds.width;
    var originY = (bounds.height === 0) ? 0.5 : (this.y - bounds.top) / bounds.height;
    SetOriginBase.call(this, originX, originY);

    return this;
}

export default SetSizeFromBounds;