import InitFaces from './InitFaces.js';

const Mesh = Phaser.GameObjects.Mesh;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const DegToRad = Phaser.Math.DegToRad;
const FOV = 45;
const PanZ = 1 + (1 / Math.sin(DegToRad(FOV)));

class Image extends Mesh {
    constructor(scene, x, y, key, frame, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            key = GetValue(config, 'key', null);
            frame = GetValue(config, 'frame', null);
        }

        super(scene, x, y, key, frame);
        this.type = 'rexQuadImage';
        InitFaces(this);
        this.setSizeToFrame();
        this.resetPerspective();
        this.panZ(PanZ);
        this.hideCCW = GetValue(config, 'hideCCW', true);
        this.resetVerts();
    }

    resetPerspective() {
        this.setPerspective(this.width, this.height, FOV);
        return this;
    }

    resetVerts() {
        // Clear faces and vertices        
        this.dirtyCache[9] = -1;

        var top = 0, bottom = this.height,
            left = 0, right = this.width;
        var vertices = [
            [left, top],    // top-left
            [right, top],   // top-right
            [left, bottom], // bottom-left
            [right, bottom] // bottom-right
        ];

        // Calculate vertex data
        var srcWidth = this.width;
        var srcHeight = this.height;
        var vHalfWidth = (this.frame.cutWidth / srcHeight) / 2;
        var vHalfHeight = (this.frame.cutHeight / srcHeight) / 2;

        var flipY = this.frame.source.isRenderTexture;
        var frameU0 = this.frame.u0;
        var frameU1 = this.frame.u1;
        var frameV0 = (!flipY) ? this.frame.v0 : this.frame.v1;
        var frameV1 = (!flipY) ? this.frame.v1 : this.frame.v0;
        var frameU = frameU1 - frameU0;
        var frameV = frameV1 - frameV0;

        // Update vertex
        for (var i = 0, cnt = vertices.length; i < cnt; i++) {
            var p = vertices[i];
            var px = p[0];
            var py = p[1];

            var x = (px / srcHeight) - vHalfWidth;
            var y = (py / srcHeight) - vHalfHeight;
            var u = frameU0 + (frameU * (px / srcWidth));
            var v = frameV0 + (frameV * (py / srcHeight));
            this.vertices[i]
                .set(x, -y, 0)
                .setUVs(u, v)
        }

        this.reesetControlPoints();

        return this;
    }

    syncSize() {
        this.setSizeToFrame();  // Reset size
        this.resetPerspective();  // Reset perspective
        this.resetVerts();  // Reset verts
        return this;
    }

    reesetControlPoints() {
        var top = 0, bottom = this.height,
            left = 0, right = this.width;
        this.topLeft.setLocalXY(left, top, true);
        this.topRight.setLocalXY(right, top, true);
        this.bottomLeft.setLocalXY(left, bottom, true);
        this.bottomRight.setLocalXY(right, bottom, true);
        return this;
    }

    forceUpdate() {
        this.dirtyCache[10] = 1;
        return this;
    }
}

export default Image;