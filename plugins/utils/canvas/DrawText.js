var DrawText = function (
    canvas, context,
    x, y,
    text,
    textAlign, font,
    fillStyle, strokeStyle, lineWidth
) {

    if ((lineWidth === undefined) && (strokeStyle != null)) {
        lineWidth = 2;
    }

    context.font = font;
    context.textAlign = textAlign;

    if (fillStyle != null) {
        context.fillStyle = fillStyle;
        context.fillText(text, x, y);
    }
    if ((strokeStyle != null) && (strokeThickness > 0)) {
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.strokeText(text, x, y);
    }
}

export default DrawText;