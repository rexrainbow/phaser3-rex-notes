var FillStyleCanvas = function(ctx?: any, src?: any, altColor?: any, altAlpha?: any)
{
    var fillColor = (altColor) ? altColor : src.fillColor;
    var fillAlpha = (altAlpha) ? altAlpha : src.fillAlpha;

    var red = ((fillColor & 0xFF0000) >>> 16);
    var green = ((fillColor & 0xFF00) >>> 8);
    var blue = (fillColor & 0xFF);

    ctx.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + fillAlpha + ')';
};

export default FillStyleCanvas;