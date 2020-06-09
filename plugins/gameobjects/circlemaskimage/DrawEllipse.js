var DrawEllipse = function (ctx, width, height) {
    var centerX = Math.floor(width / 2),
        centerY = Math.floor(height / 2);
    ctx.ellipse(centerX, centerY, centerX, centerY, 0, 0, (2 * Math.PI));
}

export default DrawEllipse;