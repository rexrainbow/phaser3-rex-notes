const DegToRad = Phaser.Math.DegToRad;
var DrawPieceMask = function (graphics, config) {
    var width = config.width;
    var height = config.height;
    var indent = config.indent;

    var edgeModes = config.edgeModes;
    var rightEdgeMode, bottomEdgeMode, leftEdgeMode, topEdgeMode;
    if (typeof (edgeModes) === 'string') {
        [rightEdgeMode, bottomEdgeMode, leftEdgeMode, topEdgeMode] =
            edgeModes.split('').map(function (x) { return parseInt(x) });
    } else {
        rightEdgeMode = edgeModes.right;
        bottomEdgeMode = edgeModes.bottom;
        leftEdgeMode = edgeModes.left;
        topEdgeMode = edgeModes.top;
    }

    var centerX = width / 2, centerY = height / 2;

    graphics.clear();
    graphics.beginPath();

    graphics.moveTo(indent, indent);

    switch (topEdgeMode) {
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

    switch (rightEdgeMode) {
        case 1:
            graphics.arc(width - indent, centerY, indent, DegToRad(270), DegToRad(90), false);
            break;
        case 2:
            graphics.arc(width - indent, centerY, indent, DegToRad(270), DegToRad(90), true);
            break;
    }
    graphics.lineTo(width - indent, height - indent);

    switch (bottomEdgeMode) {
        case 1:
            graphics.arc(centerX, height - indent, indent, DegToRad(0), DegToRad(180), false);
            break;
        case 2:
            graphics.arc(centerX, height - indent, indent, DegToRad(0), DegToRad(180), true);
            break;
    }
    graphics.lineTo(indent, height - indent);

    switch (leftEdgeMode) {
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