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

        this._x = 0;
        this._y = 0;
        this._rotation = 0;
        this._dx = 0;
        this._dy = 0;
        this.ox = 0;
        this.oy = 0;
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

        var ox = this.ox;
        var oy = this.oy;

        this.vertices[0].rotateAround(ox, oy, value);
        this.vertices[1].rotateAround(ox, oy, value);
        this.vertices[2].rotateAround(ox, oy, value);
    }

    get angle() {
        return RadToDeg(this._rotation);
    }

    set angle(value) {
        return DegToRad(value);
    }

    setNormalUV(u0, v0, u1, v1, u2, v2) {
        this.vertices[0].setNormalUV(u0, v0);
        this.vertices[1].setNormalUV(u1, v1);
        this.vertices[2].setNormalUV(u2, v2);

        return this;
    }

    setFrameSize(frameWidth, frameHeight) {
        for (var i = 0, cnt = this.vertices.length; i < cnt; i++) {
            this.vertices[i].setFrameSize(frameWidth, frameHeight);
        }

        this.setOXY();

        return this;
    }

    setOXY(ox, oy) {
        if (ox === undefined) {
            // Calculate the incenter (cx, cy) of the triangle
            var centerXY = GetInCenter(
                this.vertices[0].x, this.vertices[0].y,
                this.vertices[1].x, this.vertices[1].y,
                this.vertices[2].x, this.vertices[2].y,
                true
            );
            this.ox = centerXY.x;
            this.oy = centerXY.y;
        } else if (oy === undefined) {
            switch (ox) {
                case 1:
                    this.ox = triangle.x1;
                    this.oy = triangle.y1;
                    break;
                case 2:
                    this.ox = triangle.x2;
                    this.oy = triangle.y2;
                    break;
                default:
                    this.ox = triangle.x0;
                    this.oy = triangle.y0;
                    break;
            }
        } else {
            this.ox = ox;
            this.oy = oy;
        }

        return this;
    }

    setUV(frameU0, frameV0, frameU1, frameV1) {
        this.vertices[0].setUV(frameU0, frameV0, frameU1, frameV1);
        this.vertices[1].setUV(frameU0, frameV0, frameU1, frameV1);
        this.vertices[2].setUV(frameU0, frameV0, frameU1, frameV1);

        return this;
    }

    // TODO
    updateVertices() {
        var triangle = this.frameTriangle;

        var offsetX = this.x;
        var offsetY = this.y;

        this.vertices[0].x = triangle.x0 + offsetX;
        this.vertices[0].y = triangle.y0 + offsetY;

        this.vertices[1].x = triangle.x1 + offsetX;
        this.vertices[1].y = triangle.y1 + offsetY;

        this.vertices[2].x = triangle.x2 + offsetX;
        this.vertices[2].y = triangle.y2 + offsetY;

        return this;
    }

    setRotation(value) {
        this.rotation = value;
        return this;
    }
}

export default Face;
