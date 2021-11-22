import Point from './Vertex.js';

const Mesh = Phaser.GameObjects.Mesh;
const Vertex = Phaser.Geom.Mesh.Vertex;
const Face = Phaser.Geom.Mesh.Face;
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
        this.setSizeToFrame();

        this.resetPerspective();
        this.panZ(PanZ);
        this.hideCCW = GetValue(config, 'hideCCW', true);
        this.resetVerts();


        var left = 0, right = this.width,
            top = 0, bottom = this.height;

        this.topLeft = new Point(this, 0, left, top);
        this.topRight = new Point(this, 1, right, top);
        this.bottomLeft = new Point(this, 2, left, bottom);
        this.bottomRight = new Point(this, 3, right, bottom);
    }

    resetPerspective() {
        this.setPerspective(this.width, this.height, FOV);
        return this;
    }

    resetVerts() {
        // Clear faces and vertices
        this.clear();
        this.dirtyCache[9] = -1;

        var top = 0, bottom = this.height,
            left = 0, right = this.width;
        var vertices = [
            [left, top],    // top-left
            [right, top],   // top-right
            [left, bottom], // bottom-left
            [right, bottom] // bottom-right
        ];
        var indices = [
            0, 2, 1,
            2, 3, 1
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

        // Build vertex
        for (var i = 0, cnt = vertices.length; i < cnt; i++) {
            var p = vertices[i];
            var px = p[0];
            var py = p[1];

            var x = (px / srcHeight) - vHalfWidth;
            var y = (py / srcHeight) - vHalfHeight;
            var u = frameU0 + (frameU * (px / srcWidth));
            var v = frameV0 + (frameV * (py / srcHeight));
            vertices[i] = new Vertex(x, -y, 0, u, v);
        }

        // Build face
        var faces = [];
        for (var i = 0, cnt = indices.length; i < cnt; i += 3) {
            var vert1 = vertices[indices[i + 0]];
            var vert2 = vertices[indices[i + 1]];
            var vert3 = vertices[indices[i + 2]];
            var face = new Face(vert1, vert2, vert3);
            faces.push(face);
        }

        this.vertices.push(...vertices);
        this.faces.push(...faces);

        return this;
    }

    syncSize() {
        this.setSizeToFrame();  // Reset size
        this.resetPerspective();  // Reset perspective
        this.resetVerts();  // Reset verts
        return this;
    }

    forceUpdate() {
        this.dirtyCache[10] = 1;
        return this;
    }
}

export default Image;