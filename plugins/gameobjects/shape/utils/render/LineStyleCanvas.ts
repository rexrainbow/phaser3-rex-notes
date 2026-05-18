var LineStyleCanvas = function(ctx?: any, src?: any, altColor?: any, altAlpha?: any)
{
    var strokeColor = (altColor) ? altColor : src.strokeColor;
    var strokeAlpha = (altAlpha) ? altAlpha : src.strokeAlpha;

    var red = ((strokeColor & 0xFF0000) >>> 16);
    var green = ((strokeColor & 0xFF00) >>> 8);
    var blue = (strokeColor & 0xFF);

    ctx.strokeStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + strokeAlpha + ')';
    ctx.lineWidth = src.lineWidth;
};

export default LineStyleCanvas;