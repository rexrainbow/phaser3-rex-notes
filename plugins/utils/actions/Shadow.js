var Shadow = function (target, shadow) {
    shadow
        .setOrigin(target.originX, targetOriginY)
        .setDisplaySize(target.displayWidth, target.displayHeight)
        .setRotation(target.rotation)
        .setPosition(target.x, target.y)
        .setVisible(target.visible)
        .setAlpha(target.alpha)

    return shadow;
}

export default Shadow;