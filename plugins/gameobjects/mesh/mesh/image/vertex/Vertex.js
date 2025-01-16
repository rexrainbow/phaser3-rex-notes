import { LocalXYToWorldXY, WorldXYToLocalXY } from '../../utils/WorldXY.js';

const Linear = Phaser.Math.Linear;
const RotateAround = Phaser.Math.RotateAround;

class Vertex {
    constructor() {
        this.parent = undefined;  // Mesh game object
        this.name = '';

        this.u = 0;
        this.v = 0;
        this.frameU = 0;
        this.frameV = 0;
        this.frameX = 0;
        this.frameY = 0;
        this._dx = 0;
        this._dy = 0;
        this.localX = 0;
        this.localY = 0;
        this.alpha = 1;
        this.color = 0xffffff;
    }

    setParent(parent) {
        this.parent = parent;
        return this;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    get frameU() {
        return this._frameU;
    }

    set frameU(value) {
        if (this._frameU === value) {
            return;
        }
        this._frameU = value;

        if (this.parent) {
            this.parent.setUVDirtyFlag();
        }
    }

    get frameV() {
        return this._frameV;
    }

    set frameV(value) {
        if (this._frameV === value) {
            return;
        }
        this._frameV = value;

        if (this.parent) {
            this.parent.setUVDirtyFlag();
        }
    }

    get frameX() {
        return this._frameX;
    }

    set frameX(value) {
        if (this._frameX === value) {
            return;
        }
        this._frameX = value;
        this._localX = value + this._dx;

        if (this.parent) {
            this.parent.setVertexDirtyFlag();
        }
    }

    get frameY() {
        return this._frameY;
    }

    set frameY(value) {
        if (this._frameY === value) {
            return;
        }
        this._frameY = value;
        this._localY = value + this._dy;

        if (this.parent) {
            this.parent.setVertexDirtyFlag();
        }
    }

    get localX() {
        return this._localX;
    }

    set localX(value) {
        if (this._localX === value) {
            return;
        }
        this._localX = value;
        this._dx = value - this._frameX;

        if (this.parent) {
            this.parent.setVertexDirtyFlag();
        }
    }

    get localY() {
        return this._localY;
    }

    set localY(value) {
        if (this._localY === value) {
            return;
        }
        this._localY = value;
        this._dy = value - this._frameY;

        if (this.parent) {
            this.parent.setVertexDirtyFlag();
        }
    }

    get alpha() {
        return this._alpha;
    }

    set alpha(value) {
        if (this._alpha === value) {
            return;
        }
        this._alpha = value;

        if (this.parent) {
            this.parent.setAlphaDirtyFlag();
        }
    }

    get color() {
        return this._color;
    }

    set color(value) {
        if (this._color === value) {
            return;
        }
        this._color = value;

        if (this.parent) {
            this.parent.setColorDirtyFlag();
        }
    }

    setUV(u, v) {
        this.u = u;
        this.v = v;
        return this;
    }

    setFrameUV(frameU0, frameV0, frameU1, frameV1) {
        this.frameU = Linear(frameU0, frameU1, this.u);
        this.frameV = Linear(frameV0, frameV1, this.v);
        return this;
    }

    setFrameSize(frameWidth, frameHeight) {
        this.frameX = this.u * frameWidth;
        this.frameY = this.v * frameHeight;
        return this;
    }

    // Reset position to frame position
    resetPosition() {
        this.localX = this.frameX;
        this.localY = this.frameY;
        return this;
    }

    setLocalPosition(x, y) {
        this.localX = x;
        this.localY = y;
        return this;
    }

    rotateAround(ox, oy, rotation) {
        GlobalXY.x = this.localX;
        GlobalXY.y = this.localY;
        RotateAround(GlobalXY, ox, oy, rotation);
        this.localX = GlobalXY.x;
        this.localY = GlobalXY.y;
        return this;
    }

    setAlpha(value) {
        this.alpha = value;
        return this;
    }

    setColor(value) {
        this.color = value;
        return this;
    }

    getWorldXY(out) {
        if (this.parent) {
            return LocalXYToWorldXY(this.parent, this.localX, this.localY, out);
        } else {
            return null;
        }
    }

    setWorldXY(x, y) {
        var out = WorldXYToLocalXY(this.parent, x, y, true);
        this.setLocalPosition(out.x, out.y);
        return this;
    }

    setPosition(x, y) {
        this.setWorldXY(x, y);
        return this;
    }

    get x() {
        if (this.parent) {
            return this.getWorldXY(true).x;
        } else {
            return null;
        }
    }

    set x(value) {
        this.setWorldXY(value, this.y);
    }

    get y() {
        if (this.parent) {
            return this.getWorldXY(true).y;
        } else {
            return null;
        }
    }

    set y(value) {
        this.setWorldXY(this.x, value);
    }
}

var GlobalXY = {};

export default Vertex;