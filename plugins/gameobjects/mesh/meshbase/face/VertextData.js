const Linear = Phaser.Math.Linear;
const RotateAround = Phaser.Math.RotateAround;

class Vertex {
    constructor(mesh) {
        this.mesh = mesh;

        this.nu = 0;
        this.nv = 0;
        this.frameX = 0;
        this.frameY = 0;

        this.u = 0;
        this.v = 0;
        this.x = 0;
        this.y = 0;
        this.alpha = 1;
        this.color = 0xffffff;
    }

    get u() {
        return this._u;
    }

    set u(value) {
        if (this._u === value) {
            return;
        }
        this._u = value;
        this.mesh.setUVDirtyFlag();
    }

    get v() {
        return this._v;
    }

    set v(value) {
        if (this._v === value) {
            return;
        }
        this._v = value;
        this.mesh.setUVDirtyFlag();
    }

    get x() {
        return this._x;
    }

    set x(value) {
        if (this._x === value) {
            return;
        }
        this._x = value;
        this.mesh.setVertexDirtyFlag();
    }

    get y() {
        return this._y;
    }

    set y(value) {
        if (this._y === value) {
            return;
        }
        this._y = value;
        this.mesh.setVertexDirtyFlag();
    }

    get alpha() {
        return this._alpha;
    }

    set alpha(value) {
        if (this._alpha === value) {
            return;
        }
        this._alpha = value;
        this.mesh.setAlphaDirtyFlag();
    }

    get color() {
        return this._color;
    }

    set color(value) {
        if (this._color === value) {
            return;
        }
        this._color = value;
        this.mesh.setColorDirtyFlag();
    }

    setNormalUV(u, v) {
        this.nu = u;
        this.nv = v;
        return this;
    }

    setUV(frameU0, frameV0, frameU1, frameV1) {
        this.u = Linear(frameU0, frameU1, this.nu);
        this.v = Linear(frameV0, frameV1, this.nv);
        return this;
    }

    setFrameSize(frameWidth, frameHeight) {
        this.frameX = this.nu * frameWidth;
        this.frameY = this.nv * frameHeight;
        return this;
    }

    resetPosition() {
        this.x = this.frameX;
        this.y = this.frameY;
        return this;
    }

    translate(x, y) {
        this.x += x;
        this.y += y;
        return this;
    }

    rotateAround(ox, oy, rotation) {
        RotateAround(this, ox, oy, rotation);
        return this;
    }

    setColor(value) {
        this.color = value;
        return this;
    }
}

export default Vertex;