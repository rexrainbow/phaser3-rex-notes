
var Bind = function (target) {
    this.target = target;

    this
        .setOrigin(target.originX, target.originY)
        .setPosition(target.x, target.y)
        .setAngle(target.angle)
        .setSize(target.displayWidth, target.displayHeight)

    this.pin(target);

    this.updateChildren();

    return this;
}

export default Bind;