import ShatterRectangleToTriangles from '../../utils/math/triangulate/ShatterRectangleToTriangles.js';

const Mesh = Phaser.GameObjects.Mesh;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const GenerateGridVerts = Phaser.Geom.Mesh.GenerateGridVerts;
const Vertex = Phaser.Geom.Mesh.Vertex;
const Face = Phaser.Geom.Mesh.Face;
const DistanceSquared = Phaser.Math.Distance.Squared;
const DegToRad = Phaser.Math.DegToRad;

const FOV = 45;
const PanZ = 1 + (1 / Math.sin(DegToRad(FOV)));

class ShatterImage extends Mesh {
    constructor(scene, x, y, key, frame, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            key = GetValue(config, 'key', null);
            frame = GetValue(config, 'frame', null);
        }

        super(scene, x, y, key, frame);
        this.type = 'rexShatterImage';
        this.setSizeToFrame();
        this.setPerspective(this.width, this.height, FOV);
        this.panZ(PanZ);
        this.resetImage();

        this.shatterCenter = { x: null, y: null };
    }

    resetImage() {
        this.clear();
        this.dirtyCache[9] = -1;
        GenerateGridVerts({
            mesh: this,
            texture: this.texture.key, frame: this.frame.name,
            width: this.frame.cutWidth / this.height,
            height: this.frame.cutHeight / this.height,
            flipY: this.frame.source.isRenderTexture
        });
        return this
    }

    shatter(centerX, centerY) {
        if (centerX === undefined) {
            centerX = this.width / 2;
            centerY = this.height / 2;
        }
        this.shatterCenter.x = centerX;
        this.shatterCenter.y = centerY;

        // Clear faces and vertices
        this.clear();
        this.dirtyCache[9] = -1;
        if ((this.width === 0) || (this.height === 0)) {
            return this;
        }

        var result = ShatterRectangleToTriangles({
            width: this.width,
            height: this.height,
            center: this.shatterCenter,
            triangleOutput: false
        })
        var vertices = result.vertices;
        var indices = result.indices;

        // Calculate vertex data
        var verticesData = [];
        var srcWidth = this.width;
        var srcHeight = this.height;
        var vWidth = this.frame.cutWidth / srcHeight;
        var vHeight = this.frame.cutHeight / srcHeight;
        var vHalfWidth = vWidth / 2;
        var vHalfHeight = vHeight / 2;

        var flipY = this.frame.source.isRenderTexture;
        var frameU0 = this.frame.u0;
        var frameU1 = this.frame.u1;
        var frameV0 = (!flipY) ? this.frame.v0 : this.frame.v1;
        var frameV1 = (!flipY) ? this.frame.v1 : this.frame.v0;
        var frameU = frameU1 - frameU0;
        var frameV = frameV1 - frameV0;

        for (var i = 0, cnt = vertices.length; i < cnt; i++) {
            var p = vertices[i];
            var px = p[0];
            var py = p[1];

            var vx = (px / srcHeight) - vHalfWidth;
            var vy = (py / srcHeight) - vHalfHeight;

            var u = frameU0 + (frameU * (px / srcWidth));
            var v = frameV0 + (frameV * (py / srcHeight));
            verticesData.push({
                x: px, y: py,
                vx: vx, vy: -vy,
                u: u, v: v
            })
        }

        // Build face
        for (var i = 0, cnt = indices.length; i < cnt; i += 3) {
            var v0 = verticesData[indices[i + 0]];
            var v1 = verticesData[indices[i + 1]];
            var v2 = verticesData[indices[i + 2]];

            var vert1 = new Vertex(v0.vx, v0.vy, 0, v0.u, v0.v);
            var vert2 = new Vertex(v1.vx, v1.vy, 0, v1.u, v1.v);
            var vert3 = new Vertex(v2.vx, v2.vy, 0, v2.u, v2.v);
            var face = new Face(vert1, vert2, vert3);

            this.vertices.push(vert1, vert2, vert3);
            this.faces.push(face);

            // Sort faces from center
            face.g = Math.min(
                DistanceSquared(centerX, centerY, v0.x, v0.y),
                DistanceSquared(centerX, centerY, v1.x, v1.y),
                DistanceSquared(centerX, centerY, v2.x, v2.y)
            );
        }

        // Sort faces from center
        this.faces.sort(function (faceA, faceB) {
            return faceA.g - faceB.g;
        })

        return this;
    }
}

export default ShatterImage;