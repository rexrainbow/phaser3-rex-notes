import Vertex from './Vertex.js';
import GetInCenter from './GetInCenter.js';
import Contains from './Contains.js';

const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;

class Face {
    constructor(vertex0, vertex1, vertex2) {
        if (vertex0 === undefined) { vertex0 = new Vertex(); }
        if (vertex1 === undefined) { vertex1 = new Vertex(); }
        if (vertex2 === undefined) { vertex2 = new Vertex(); }

        this.parent = undefined;  // Mesh game object
        this.name = '';

        this.vertices = [vertex0, vertex1, vertex2];

        this._localOffsetX = 0;
        this._localOffsetY = 0;
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

    get localOffsetX() {
        return this._localOffsetX;
    }

    set localOffsetX(value) {
        if (value === this._localOffsetX) {
            return;
        }
        this._localOffsetX = value;

        this.updateVerticesPosition();
    }

    get localOffsetY() {
        return this._localOffsetY;
    }

    set localOffsetY(value) {
        if (value === this._localOffsetY) {
            return;
        }
        this._localOffsetY = value;
        this.updateVerticesPosition();
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

    get isPositionModified() {
        return (this._localOffsetX !== 0) || (this._localOffsetY !== 0) || (this._rotation !== 0);
    }

    setUV(u0, v0, u1, v1, u2, v2) {
        this.vertices[0].setUV(u0, v0);
        this.vertices[1].setUV(u1, v1);
        this.vertices[2].setUV(u2, v2);

        return this;
    }

    setFrameUV(frameU0, frameV0, frameU1, frameV1) {
        this.vertices[0].setFrameUV(frameU0, frameV0, frameU1, frameV1);
        this.vertices[1].setFrameUV(frameU0, frameV0, frameU1, frameV1);
        this.vertices[2].setFrameUV(frameU0, frameV0, frameU1, frameV1);

        return this;
    }

    setFrameSize(frameWidth, frameHeight) {
        // Set local position of vertices by frameXY and dxy
        for (var i = 0, cnt = this.vertices.length; i < cnt; i++) {
            this.vertices[i].setFrameSize(frameWidth, frameHeight)
        }

        // Apply face offset, and rotation to vertices
        if (this.isPositionModified) {
            this.updateVerticesPosition();
        }
        return this;
    }

    setLocalOffset(x, y) {
        this.localOffsetX = x;
        this.localOffsetY = y;
        return this;
    }

    resetVerticesPosition() {
        for (var i = 0, cnt = this.vertices.length; i < cnt; i++) {
            this.vertices[i].resetPosition();
        }

        if (this.isPositionModified) {
            this.updateVerticesPosition();
        }
        return this;
    }

    updateVerticesPosition() {
        // Extract the horizontal offset of the Face to calculate the new vertex positions
        var offsetX = this._localOffsetX;
        // Extract the vertical offset of the Face to calculate the new vertex positions
        var offsetY = this._localOffsetY;

        var vertices = this.vertices;
        for (var i = 0, cnt = vertices.length; i < cnt; i++) {
            var vertex = vertices[i];
            // Update each vertex position based on frameX, frameY, and the Face's offsets
            // This process overrides the original dx and dy values, ensuring the relative distance between the three vertices is maintained
            vertex.setLocalPosition(vertex.frameX + offsetX, vertex.frameY + offsetY);
        }

        // Save the current rotation value to reapply after resetting rotation to 0
        var rotationSave = this.rotation;
        this._rotation = 0;
        this.rotation = rotationSave;

        return this;
    }

    setRotation(value) {
        this.rotation = value;
        return this;
    }

    setAngle(value) {
        this.angle = value;
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

    contains(localX, localY) {
        return Contains(this, localX, localY);
    }
}

export default Face;
