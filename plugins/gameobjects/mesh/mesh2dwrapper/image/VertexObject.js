import { LocalXYToWorldXY, WorldXYToLocalXY } from '../utils/WorldXY.js';

import { Math as PhaserMath } from 'phaser';
const Linear = PhaserMath.Linear;
const RotateAround = PhaserMath.RotateAround;

class VertexObject {
    constructor(parent, index, u, v) {
        if (index === undefined) { index = -1; }
        if (u === undefined) { u = 0; }
        if (v === undefined) { v = 0; }

        this.parent = undefined;
        this.index = index;
        this.name = '';

        this.u = u;
        this.v = v;
        this._frameU = 0;
        this._frameV = 0;
        this._frameX = 0;
        this._frameY = 0;
        this._dx = 0;
        this._dy = 0;
        this._localX = 0;
        this._localY = 0;
        this._alpha = 1;
        this._color = 0xffffff;
        this.xyz = [0, 0, 0];

        if (parent) {
            this.setParent(parent, index);
        }
    }

    setParent(parent, index) {
        this.parent = parent;
        if (index !== undefined) {
            this.index = index;
        }
        this.writeToMesh();
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
        this.writeUVToMesh();
    }

    get frameV() {
        return this._frameV;
    }

    set frameV(value) {
        if (this._frameV === value) {
            return;
        }
        this._frameV = value;
        this.writeUVToMesh();
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
        this.writePositionToMesh();
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
        this.writePositionToMesh();
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
        this.writePositionToMesh();
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
        this.writePositionToMesh();
    }

    get alpha() {
        return this._alpha;
    }

    set alpha(value) {
        this._alpha = value;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
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

    setFrameSize(frameWidth, frameHeight, frameX, frameY) {
        if (frameX === undefined) { frameX = 0; }
        if (frameY === undefined) { frameY = 0; }

        this.frameX = frameX + (this.u * frameWidth);
        this.frameY = frameY + (this.v * frameHeight);
        return this;
    }

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

    writePositionToMesh() {
        var parent = this.parent;
        if (!parent || this.index < 0) {
            return this;
        }

        var offset = this.index * 4;
        parent.vertices[offset] = this._localX - parent.displayOriginX;
        parent.vertices[offset + 1] = this._localY - parent.displayOriginY;

        return this;
    }

    writeUVToMesh() {
        var parent = this.parent;
        if (!parent || this.index < 0) {
            return this;
        }

        var offset = this.index * 4;
        parent.vertices[offset + 2] = this._frameU;
        parent.vertices[offset + 3] = this._frameV;

        return this;
    }

    writeToMesh() {
        this.writePositionToMesh();
        this.writeUVToMesh();
        return this;
    }
}

var GlobalXY = {};

export default VertexObject;
