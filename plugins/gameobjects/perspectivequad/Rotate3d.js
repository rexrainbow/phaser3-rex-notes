const RotateVec3 = Phaser.Math.RotateVec3;

var Rotate3d = function (x, y, z, a) {
    axisVec3.set(x, y, z);

    var halfWidth = this.width / 2;
    var halfHeight = this.height / 2;

    // top-left
    globVec3.set(-1, -1, 0);
    RotateVec3(globVec3, axisVec3, a);
    this.topLeftX = this.x + (globVec3.x * halfWidth);
    this.topLeftY = this.y + (globVec3.y * halfHeight);

    // top-right
    globVec3.set(1, -1, 0);
    RotateVec3(globVec3, axisVec3, a);
    this.topRightX = this.x + (globVec3.x * halfWidth);
    this.topRightY = this.y + (globVec3.y * halfHeight);

    // bottom-left
    globVec3.set(-1, 1, 0);
    RotateVec3(globVec3, axisVec3, a);
    this.bottomLeftX = this.x + (globVec3.x * halfWidth);
    this.bottomLeftY = this.y + (globVec3.y * halfHeight);

    // bottom-right
    globVec3.set(1, 1, 0);
    RotateVec3(globVec3, axisVec3, a);
    this.bottomRightX = this.x + (globVec3.x * halfWidth);
    this.bottomRightY = this.y + (globVec3.y * halfHeight);

    return this;
}

var globVec3 = new Phaser.Math.Vector3();
var axisVec3 = new Phaser.Math.Vector3();

export default Rotate3d;