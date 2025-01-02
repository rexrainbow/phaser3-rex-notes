import Vertex from './Vertex.js';
import GetInCenter from './GetInCenter.js';

const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;

class Face {
    constructor(mesh, vertex0, vertex1, vertex2) {
        if (vertex0 === undefined) { vertex0 = new Vertex(mesh); }
        if (vertex1 === undefined) { vertex1 = new Vertex(mesh); }
        if (vertex2 === undefined) { vertex2 = new Vertex(mesh); }

        this.mesh = mesh;

        this.vertex0 = vertex0;
        this.vertex1 = vertex1;
        this.vertex2 = vertex2;

        this._x = 0;
        this._y = 0;
        this._rotation = 0;
        this._dx = 0;
        this._dy = 0;
        this.ox = 0;
        this.oy = 0;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        if (value === this._x) {
            return;
        }
        this.
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

        this.vertex0.rotateAround(ox, oy, value);
        this.vertex1.rotateAround(ox, oy, value);
        this.vertex2.rotateAround(ox, oy, value);
    }

    get angle() {
        return RadToDeg(this._rotation);
    }

    set angle(value) {
        return DegToRad(value);
    }

    setNormalUV(u0, v0, u1, v1, u2, v2) {
        this.vertex0.setNormalUV(u0, v0);
        this.vertex1.setNormalUV(u1, v1);
        this.vertex2.setNormalUV(u2, v2);

        return this;
    }

    setFrameSize(frameWidth, frameHeight) {
        this.vertex0.setFrameSize(frameWidth, frameHeight);
        this.vertex1.setFrameSize(frameWidth, frameHeight);
        this.vertex2.setFrameSize(frameWidth, frameHeight);

        this.setOXY();

        return this;
    }

    setOXY(ox, oy) {
        if (ox === undefined) {
            // Calculate the incenter (cx, cy) of the triangle
            var centerXY = GetInCenter(
                this.vertex0.x, this.vertex0.y,
                this.vertex1.x, this.vertex1.y,
                this.vertex2.x, this.vertex2.y,
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
        this.vertex0.setUV(frameU0, frameV0, frameU1, frameV1);
        this.vertex1.setUV(frameU0, frameV0, frameU1, frameV1);
        this.vertex2.setUV(frameU0, frameV0, frameU1, frameV1);

        return this;
    }

    // TODO
    updateVertices() {
        var triangle = this.frameTriangle;

        var offsetX = this.x;
        var offsetY = this.y;

        this.vertex0.x = triangle.x0 + offsetX;
        this.vertex0.y = triangle.y0 + offsetY;

        this.vertex1.x = triangle.x1 + offsetX;
        this.vertex1.y = triangle.y1 + offsetY;

        this.vertex2.x = triangle.x2 + offsetX;
        this.vertex2.y = triangle.y2 + offsetY;

        return this;
    }

    setRotation(value) {
        this.rotation = value;
        return this;
    }
}

export default Face;
