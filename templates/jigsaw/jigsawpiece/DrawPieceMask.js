const DegToRad = Phaser.Math.DegToRad;
const RAD0 = DegToRad(0);
const RAD90 = DegToRad(90);
const RAD180 = DegToRad(180);
const RAD270 = DegToRad(270);
const RAD360 = DegToRad(360);

var DrawPieceMask = function (graphics, width, height, indent, edgeMode) {
    var centerX = width / 2, centerY = height / 2;

    graphics.clear();
    graphics.beginPath();

    graphics.moveTo(indent, indent);

    switch (edgeMode.top) {
        case 1:
            graphics.lineTo(centerX - indent, indent);
            graphics.arc(centerX, indent, indent, RAD180, RAD360, false);
            break;
        case 2:
            graphics.lineTo(centerX - indent, indent);
            graphics.arc(centerX, indent, indent, RAD180, RAD360, true);
            break;
    }
    graphics.lineTo(width - indent, indent);

    switch (edgeMode.right) {
        case 1:
            graphics.arc(width - indent, centerY, indent, RAD270, RAD90, false);
            break;
        case 2:
            graphics.arc(width - indent, centerY, indent, RAD270, RAD90, true);
            break;
    }
    graphics.lineTo(width - indent, height - indent);

    switch (edgeMode.bottom) {
        case 1:
            graphics.arc(centerX, height - indent, indent, RAD0, RAD180, false);
            break;
        case 2:
            graphics.arc(centerX, height - indent, indent, RAD0, RAD180, true);
            break;
    }
    graphics.lineTo(indent, height - indent);

    switch (edgeMode.left) {
        case 1:
            graphics.arc(indent, centerY, indent, RAD90, RAD270, false);
            break;
        case 2:
            graphics.arc(indent, centerY, indent, RAD90, RAD270, true);
            break;
    }
    graphics.lineTo(indent, indent);

    graphics.closePath();
    graphics.fillPath();
}

export default DrawPieceMask