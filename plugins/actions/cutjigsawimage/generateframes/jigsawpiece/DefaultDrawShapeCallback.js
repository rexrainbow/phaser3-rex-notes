const DegToRad = Phaser.Math.DegToRad;
const RAD0 = DegToRad(0);
const RAD90 = DegToRad(90);
const RAD180 = DegToRad(180);
const RAD270 = DegToRad(270);
const RAD360 = DegToRad(360);

var DefaultDrawShapeCallback = function (
    // graphics for dynamic texture
    // context for canvas texture
    graphics,

    width, height,
    edgeWidth, edgeHeight,
    edgeMode
) {

    var centerX = width / 2, centerY = height / 2;
    var leftX = edgeWidth,
        rightX = width - edgeWidth,
        topY = edgeHeight,
        bottomY = height - edgeHeight;
    var hasEdgeWidth = edgeWidth > 0,
        hasEdgeHeight = edgeHeight > 0;
    var topEdgeMode = (hasEdgeHeight) ? edgeMode.top : 0;
    var bottomEdgeMode = (hasEdgeHeight) ? edgeMode.bottom : 0;
    var rightEdgeMode = (hasEdgeWidth) ? edgeMode.right : 0;
    var leftEdgeMode = (hasEdgeWidth) ? edgeMode.left : 0;

    graphics.clear();

    graphics.beginPath();

    graphics.moveTo(leftX, topY);

    switch (topEdgeMode) {
        case 1:
            graphics.lineTo(centerX - edgeHeight - 1, topY);
            graphics.arc(centerX, topY, edgeHeight + 1, RAD180, RAD360, false);
            break;
        case 2:
            graphics.lineTo(centerX - edgeHeight + 1, topY);
            graphics.arc(centerX, topY, edgeHeight - 1, RAD180, RAD360, true);
            break;
    }
    graphics.lineTo(rightX, topY);

    switch (rightEdgeMode) {
        case 1:
            graphics.arc(rightX, centerY, edgeWidth + 1, RAD270, RAD90, false);
            break;
        case 2:
            graphics.arc(rightX, centerY, edgeWidth - 1, RAD270, RAD90, true);
            break;
    }
    graphics.lineTo(rightX, bottomY);

    switch (bottomEdgeMode) {
        case 1:
            graphics.arc(centerX, bottomY, edgeHeight + 1, RAD0, RAD180, false);
            break;
        case 2:
            graphics.arc(centerX, bottomY, edgeHeight - 1, RAD0, RAD180, true);
            break;
    }
    graphics.lineTo(leftX, bottomY);

    switch (leftEdgeMode) {
        case 1:
            graphics.arc(leftX, centerY, edgeWidth + 1, RAD90, RAD270, false);
            break;
        case 2:
            graphics.arc(leftX, centerY, edgeWidth - 1, RAD90, RAD270, true);
            break;
    }
    graphics.lineTo(leftX, topY);

    graphics.closePath();

    graphics.fillPath();
}

export default DefaultDrawShapeCallback;