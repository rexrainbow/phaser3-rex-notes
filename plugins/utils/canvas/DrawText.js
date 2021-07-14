var DrawText = function (
    canvas, context,
    x, y,
    text, font,
    fillStyle, strokeStyle, lineWidth,
    textAlign, textBaseline
) {

    if ((lineWidth === undefined) && (strokeStyle != null)) {
        lineWidth = 2;
    }

    if (textAlign === undefined) {
        textAlign = 'start';
    }

    if (textBaseline === undefined) {
        textBaseline = 'alphabetic';
    }

    context.font = font;
    context.textAlign = textAlign;
    context.textBaseline = textBaseline;

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