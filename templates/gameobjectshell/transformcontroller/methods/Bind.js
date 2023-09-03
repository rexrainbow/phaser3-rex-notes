
var Bind = function (target) {
    if (this.target) {
        this.unpin(this.target);
        this.target = undefined;
    }

    this.target = target;

    if (target) {
        this
            .setVisible(true)
            .setOrigin(target.originX, target.originY)
            .setPosition(target.x, target.y)
            .setAngle(target.angle)
            .setSize(target.displayWidth, target.displayHeight)

        this.pin(target);

        this.updateChildren();

    } else {
        this.setVisible(false);

    }

    return this;
}

export default Bind;