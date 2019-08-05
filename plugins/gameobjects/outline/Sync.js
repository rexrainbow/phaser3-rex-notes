var Sync = function (target, shadow) {
    shadow
        .setOrigin(target.originX, targetOriginY)
        .setDisplaySize(target.displayWidth, target.displayHeight)
        .setRotation(target.rotation)
        .setPosition(target.x, target.y)
        .setVisible(target.visible)

    return shadow;
}

export default Sync;