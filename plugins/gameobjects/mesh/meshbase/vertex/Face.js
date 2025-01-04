import Vertex from './Vertex.js';
import GetInCenter from './GetInCenter.js';

const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;

class Face {
    constructor(vertex0, vertex1, vertex2) {
        if (vertex0 === undefined) { vertex0 = new Vertex(); }
        if (vertex1 === undefined) { vertex1 = new Vertex(); }
        if (vertex2 === undefined) { vertex2 = new Vertex(); }

        this.parent = undefined;
        this.name = '';

        this.vertices = [vertex0, vertex1, vertex2];

        this._x = 0; // face offsetX
        this._y = 0; // face offsetY
        this._rotation = 0;
        this._alpha = 1;
        this._color = 0xffffff;
    }

    setParent(parent) {
        this.parent = parent;
        this.vertices[0].setParent(parent);
        this.vertices[1].setParent(parent);
        this.vertices[2].setParent(parent);

        return this;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    get vertex0() {
        return this.vertices[0];
    }

    set vertex0(value) {
        this.vertices[0] = value;
    }

    get vertex1() {
        return this.vertices[1];
    }

    set vertex1(value) {
        this.vertices[1] = value;
    }

    get vertex2() {
        return this.vertices[2];
    }

    set vertex2(value) {
        this.vertices[2] = value;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        if (value === this._x) {
            return;
        }
        this._x = value;
        this.updateVertices();
    }

    get y() {
        return this._y;
    }

    set y(value) {
        if (value === this._y) {
            return;
        }
        this._y = value;
        this.updateVertices();
    }

    get rotation() {
        return this._rotation;
    }

    set rotation(value) {
        if (value === this._rotation) {
            return;
        }

        this._rotation = value;

        var oxy = GetInCenter(this, true);
        var ox = oxy.x;
        var oy = oxy.y;

        this.vertices[0].rotateAround(ox, oy, value);
        this.vertices[1].rotateAround(ox, oy, value);
        this.vertices[2].rotateAround(ox, oy, value);
    }

    get angle() {
        return RadToDeg(this._rotation);
    }

    set angle(value) {
        this.rotation = DegToRad(value);
    }

    get alpha() {
        return this._alpha;
    }

    set alpha(value) {
        if (this._alpha === value) {
            return;
        }
        this._alpha = value;

        this.vertices[0].setAlpha(value);
        this.vertices[1].setAlpha(value);
        this.vertices[2].setAlpha(value);
    }

    get color() {
        return this._color;
    }

    set color(value) {
        if (this._color === value) {
            return;
        }
        this._color = value;

        this.vertices[0].setColor(value);
        this.vertices[1].setColor(value);
        this.vertices[2].setColor(value);
    }

    setNormalUV(u0, v0, u1, v1, u2, v2) {
        this.vertices[0].setNormalUV(u0, v0);
        this.vertices[1].setNormalUV(u1, v1);
        this.vertices[2].setNormalUV(u2, v2);

        return this;
    }

    setFrameSize(frameWidth, frameHeight) {
        for (var i = 0, cnt = this.vertices.length; i < cnt; i++) {
            this.vertices[i].setFrameSize(frameWidth, frameHeight)
        }
        return this;
    }

    resetVerticesPosition() {
        for (var i = 0, cnt = this.vertices.length; i < cnt; i++) {
            this.vertices[i].resetPosition();
        }
        return this;
    }

    setUV(frameU0, frameV0, frameU1, frameV1) {
        this.vertices[0].setUV(frameU0, frameV0, frameU1, frameV1);
        this.vertices[1].setUV(frameU0, frameV0, frameU1, frameV1);
        this.vertices[2].setUV(frameU0, frameV0, frameU1, frameV1);

        return this;
    }

    updateVertices() {
        var offsetX = this.x;
        var offsetY = this.y;

        var vertices = this.vertices;
        for (var i = 0, cnt = vertices.length; i < cnt; i++) {
            var vertex = vertices[i];
            vertex.x = vertex.frameX + offsetX;
            vertex.y = vertex.frameY + offsetY;
        }

        var rotationSave = this.rotation;
        this._rotation = 0;
        this.rotation = rotationSave;

        return this;
    }

    setRotation(value) {
        this.rotation = value;
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
}

export default Face;
