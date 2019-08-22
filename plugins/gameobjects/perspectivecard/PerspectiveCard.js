const Quad = Phaser.GameObjects.Quad;
const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const RotateVec3 = Phaser.Math.RotateVec3;

class PerspectiveCard extends Quad {
    constructor(scene, x, y, key, frame, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', undefined);
            y = GetValue(config, 'x', undefined);
            key = GetValue(config, 'front.key', undefined);
            frame = GetValue(config, 'front.frame', undefined);
        } else if (IsPlainObject(key)) {
            config = key;
            key = GetValue(config, 'front.key', undefined);
            frame = GetValue(config, 'front.frame', undefined);
        } else {

        }

        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = x;
        }

        super(scene, x, y, key, frame);

        this.type = 'rexCard';
        this.setFrontTexture(key, frame);
        this.setBackTexture(GetValue(config, 'back.key', key), GetValue(config, 'back.frame', frame));
    }

    setFrontTexture(key, frame) {
        this.frontTexture = key;
        this.frontFrameName = frame;
        return this;
    }

    setBackTexture(key, frame) {
        this.backTexture = key;
        this.backFrameName = frame;
        return this;
    }

    transform(callback) {
        var halfWidth = this.width/2;
        var halfHeight = this.height/2;
        // top-left
        tmpVec3.set(-1, -1, 0);
        callback(tmpVec3);
        console.log(tmpVec3.x, tmpVec3.y, tmpVec3.z);
        this.topLeftX = this.x + (tmpVec3.x * halfWidth);
        this.topLeftY = this.y + (tmpVec3.y * halfHeight);
        // top-right
        tmpVec3.set(1, -1, 0);
        callback(tmpVec3);
        this.topRightX = this.x + (tmpVec3.x * halfWidth);
        this.topRightY = this.y + (tmpVec3.y * halfHeight);
        // bottom-left
        tmpVec3.set(-1, 1, 0);
        callback(tmpVec3);
        this.bottomLeftX = this.x + (tmpVec3.x * halfWidth);
        this.bottomLeftY = this.y + (tmpVec3.y * halfHeight);
        // bottom-right
        tmpVec3.set(1, 1, 0);
        callback(tmpVec3);
        this.bottomRightX = this.x + (tmpVec3.x * halfWidth);
        this.bottomRightY = this.y + (tmpVec3.y * halfHeight);
        return this;
    }

    set angleX(rad) {
        this.rotateX(rad);
    }

    rotateX(rad) {
        this.transform(function (vec3) {
            axisVec3.set(1, 0, 0);
            RotateVec3(vec3, axisVec3, rad);
        });
        return this;
    }

    set angleY(rad) {
        this.rotateY(rad);
    }

    rotateY(rad) {
        this.transform(function (vec3) {
            axisVec3.set(0, 1, 0);
            RotateVec3(vec3, axisVec3, rad);
        });
        return this;
    }

    set angleZ(rad) {
        this.rotateZ(rad);
    }

    rotateZ(rad) {
        this.transform(function (vec3) {
            axisVec3.set(0, 0, 1);
            RotateVec3(vec3, axisVec3, rad);
        });
        return this;
    }
}

var tmpVec3 = new Phaser.Math.Vector3();
var axisVec3 = new Phaser.Math.Vector3();

export default PerspectiveCard;