
const GetValue = Phaser.Utils.Objects.GetValue;

var LookAt = function (x, y, config) {
    var dragX, dragY;
    if (x === undefined) {
        dragX = 0;
        dragY = 0;
    } else {
        var modelXY = this.getModelXY(x, y);
        dragX = modelXY.x;
        dragY = modelXY.y;
    }

    var params = this.getParameters();

    // Eyes
    var eyeBallXWeight = GetValue(config, 'eyeBallX', 1);
    var eyeBallYWeight = GetValue(config, 'eyeBallY', 1);
    params.eyeBallX = dragX * eyeBallXWeight;
    params.eyeBallY = dragY * eyeBallYWeight;

    // Head
    var angleXWeight = GetValue(config, 'angleX', 30);
    var angleYWeight = GetValue(config, 'angleY', 30);
    var angleZWeight = GetValue(config, 'angleZ', 30);
    params.angleX = dragX * angleXWeight;
    params.angleY = dragY * angleYWeight;
    params.angleZ = (-1) * dragX * dragY * angleZWeight;

    // Body
    var bodyAngleXWeight = GetValue(config, 'bodyAngleX', 10);
    params.bodyAngleX = dragX * bodyAngleXWeight;

    return this;
}

export default LookAt;