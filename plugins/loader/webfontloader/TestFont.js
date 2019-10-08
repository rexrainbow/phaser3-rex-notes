const CanvasPool = Phaser.Display.Canvas.CanvasPool;

var TestFont = function(fontStyle, testString) {
    var canvas = CanvasPool.create(this);
    var context = canvas.getContext('2d');
    context.font = `8px ${fontStyle}`;
    var textWidth = context.measureText(testString).width;
    CanvasPool.remove(canvas);
    return (textWidth > 0)
}

export default TestFont;