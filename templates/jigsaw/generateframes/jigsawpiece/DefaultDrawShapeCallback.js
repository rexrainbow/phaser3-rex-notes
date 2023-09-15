const DegToRad = Phaser.Math.DegToRad;
const RAD0 = DegToRad(0);
const RAD90 = DegToRad(90);
const RAD180 = DegToRad(180);
const RAD270 = DegToRad(270);
const RAD360 = DegToRad(360);

var DefaultDrawShapeCallback = function (graphics, width, height, edgeWidth, edgeHeight, edgeMode) {
    var centerX = width / 2, centerY = height / 2;

    graphics.clear();
    graphics.beginPath();

    graphics.moveTo(edgeWidth, edgeHeight);

    switch (edgeMode.top) {
        case 1:
            graphics.lineTo(centerX - edgeHeight, edgeHeight);
            graphics.arc(centerX, edgeHeight, edgeHeight, RAD180, RAD360, false);
            break;
        case 2:
            graphics.lineTo(centerX - edgeHeight, edgeHeight);
            graphics.arc(centerX, edgeHeight, edgeHeight, RAD180, RAD360, true);
            break;
    }
    graphics.lineTo(width - edgeWidth, edgeHeight);

    switch (edgeMode.right) {
        case 1:
            graphics.arc(width - edgeWidth, centerY, edgeWidth, RAD270, RAD90, false);
            break;
        case 2:
            graphics.arc(width - edgeWidth, centerY, edgeWidth, RAD270, RAD90, true);
            break;
    }
    graphics.lineTo(width - edgeWidth, height - edgeHeight);

    switch (edgeMode.bottom) {
        case 1:
            graphics.arc(centerX, height - edgeHeight, edgeHeight, RAD0, RAD180, false);
            break;
        case 2:
            graphics.arc(centerX, height - edgeHeight, edgeHeight, RAD0, RAD180, true);
            break;
    }
    graphics.lineTo(edgeWidth, height - edgeHeight);

    switch (edgeMode.left) {
        case 1:
            graphics.arc(edgeWidth, centerY, edgeWidth, RAD90, RAD270, false);
            break;
        case 2:
            graphics.arc(edgeWidth, centerY, edgeWidth, RAD90, RAD270, true);
            break;
    }
    graphics.lineTo(edgeWidth, edgeHeight);

    graphics.closePath();
    graphics.fillPath();
}

export default DefaultDrawShapeCallback;