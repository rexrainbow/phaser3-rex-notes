var CircleMask = function (canvas, maskType) {
    if (canvas.width === canvas.height) {
        maskType = 0;
    }

    var x = Math.floor(canvas.width / 2);
    var y = Math.floor(canvas.height / 2);

    var ctx = canvas.getContext('2d');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();
    if (maskType === 0) {
        ctx.arc(x, y, Math.min(x, y), 0, 2 * Math.PI);
    } else {
        ctx.ellipse(x, y, x, y, 0, 0, 2 * Math.PI);
    }
    ctx.fill();
    ctx.restore();
}

export default CircleMask;