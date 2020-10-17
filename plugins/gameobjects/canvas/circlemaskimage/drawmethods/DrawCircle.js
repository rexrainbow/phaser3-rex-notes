var DrawCircle = function (ctx, width, height) {
    var centerX = Math.floor(width / 2),
        centerY = Math.floor(height / 2);
    ctx.arc(centerX, centerY, Math.min(centerX, centerY), 0, (2 * Math.PI));
}

export default DrawCircle;