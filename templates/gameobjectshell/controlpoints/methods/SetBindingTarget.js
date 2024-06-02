
var SetBindingTarget = function (target) {
    var childrenMap = this.childrenMap;
    if (childrenMap.target) {
        this.unpin(childrenMap.target);
        childrenMap.target = undefined;

        this.stopMonitorTarget();
    }

    childrenMap.target = target;

    if (target) {
        this
            .setOrigin(target.originX, target.originY)
            .setPosition(target.x, target.y)
            .setAngle(target.angle)
            .setSize(target.displayWidth, target.displayHeight)

        this.pin(target, { syncDisplayList: false });

        this
            .layout()
            .startMonitorTarget();

    }

    return this;
}

export default SetBindingTarget;