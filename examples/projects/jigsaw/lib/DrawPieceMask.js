const DegToRad = Phaser.Math.DegToRad;
var DrawPieceMask = function (graphics, width, height, indent, edgeMode) {
    var centerX = width / 2, centerY = height / 2;

    graphics.clear();
    graphics.beginPath();

    graphics.moveTo(indent, indent);

    switch (edgeMode.top) {
        case 1:
            graphics.lineTo(centerX - indent, indent);
            graphics.arc(centerX, indent, indent, DegToRad(180), DegToRad(360), false);
            break;
        case 2:
            graphics.lineTo(centerX - indent, indent);
            graphics.arc(centerX, indent, indent, DegToRad(180), DegToRad(360), true);
            break;
    }
    graphics.lineTo(width - indent, indent);

    switch (edgeMode.right) {
        case 1:
            graphics.arc(width - indent, centerY, indent, DegToRad(270), DegToRad(90), false);
            break;
        case 2:
            graphics.arc(width - indent, centerY, indent, DegToRad(270), DegToRad(90), true);
            break;
    }
    graphics.lineTo(width - indent, height - indent);

    switch (edgeMode.bottom) {
        case 1:
            graphics.arc(centerX, height - indent, indent, DegToRad(0), DegToRad(180), false);
            break;
        case 2:
            graphics.arc(centerX, height - indent, indent, DegToRad(0), DegToRad(180), true);
            break;
    }
    graphics.lineTo(indent, height - indent);

    switch (edgeMode.left) {
        case 1:
            graphics.arc(indent, centerY, indent, DegToRad(90), DegToRad(270), false);
            break;
        case 2:
            graphics.arc(indent, centerY, indent, DegToRad(90), DegToRad(270), true);
            break;
    }
    graphics.lineTo(indent, indent);

    graphics.closePath();
    graphics.fillPath();
}

export default DrawPieceMask