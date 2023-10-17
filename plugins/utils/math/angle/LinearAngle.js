// const NormalizeAngle = Phaser.Math.Angle.Normalize;
const PI2 = Phaser.Math.PI2;

var LinearAngle = function (angle0, angle1, anticlockwise, t) {
    // angle0 = NormalizeAngle(angle0);
    // angle1 = NormalizeAngle(angle1);

    var deltaAngle, interpolatedAngle;
    if (anticlockwise) {
        if (angle0 <= angle1) {
            deltaAngle = (PI2 + angle0) - angle1;
        } else {
            deltaAngle = angle0 - angle1;
        }
        interpolatedAngle = (angle0 - (deltaAngle * t) + PI2) % PI2;

    } else {
        if (angle0 >= angle1) {
            deltaAngle = (PI2 + angle1) - angle0;
        } else {
            deltaAngle = angle1 - angle0;
        }
        interpolatedAngle = (angle0 + deltaAngle * t) % PI2;
    }

    return interpolatedAngle;
}

export default LinearAngle;