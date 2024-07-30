var StyleToRGBA = function (style, canvas, context) {
    var fillStyleSave = context.fillStyle;
    context.fillStyle = style;

    var result = context.fillStyle.match(/^#([0-9a-f]{3,8})$/i);
    if (!result) {
        return null;
    }

    var result = result[1];
    var r, g, b, a = 255;
    if (result.length === 3) {
        r = parseInt(result[0] + result[0], 16);
        g = parseInt(result[1] + result[1], 16);
        b = parseInt(result[2] + result[2], 16);
    } else if (result.length === 6) {
        r = parseInt(result.slice(0, 2), 16);
        g = parseInt(result.slice(2, 4), 16);
        b = parseInt(result.slice(4, 6), 16);
    } else if (result.length === 8) {
        r = parseInt(result.slice(0, 2), 16);
        g = parseInt(result.slice(2, 4), 16);
        b = parseInt(result.slice(4, 6), 16);
        a = parseInt(result.slice(6, 8), 16);
    }

    context.fillStyle = fillStyleSave;

    return {
        r: r,
        g: g,
        b: b,
        a: a
    };
}

export default StyleToRGBA;