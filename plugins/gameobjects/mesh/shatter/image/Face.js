const Base = Phaser.Geom.Mesh.Face;
const DegToRad = Phaser.Math.DegToRad;
const RadToDeg = Phaser.Math.RadToDeg;
const RotateFace = Phaser.Geom.Mesh.RotateFace;

class Face extends Base {
    constructor(vertex1, vertex2, vertex3) {
        super(vertex1, vertex2, vertex3);

        this._rotation = 0;
    }

    get rotation() {
        return this._rotation;
    }

    set rotation(value) {
        RotateFace(this, (value - this._rotation));
        this._rotation = value;
    }

    setRotation(value) {
        this.rotation = value;
        return this;
    }

    get angle() {
        return RadToDeg(this.rotation);
    }

    set angle(value) {
        this.rotation = DegToRad(value);
    }

    setAngle(value) {
        this.angle = value;
        return this;
    }

    setAlpha(alpha) {
        this.alpha = alpha;
        return this;
    }
}

export default Face;