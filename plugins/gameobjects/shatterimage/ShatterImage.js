import ShatterRectangleToTriangles from '../../utils/math/triangulate/ShatterRectangleToTriangles.js';
import Face from './Face.js';

const Mesh = Phaser.GameObjects.Mesh;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const GenerateGridVerts = Phaser.Geom.Mesh.GenerateGridVerts;
const Vertex = Phaser.Geom.Mesh.Vertex;
const DistanceSquared = Phaser.Math.Distance.Squared;

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
        this.setOrtho();
        this.hideCCW = false;
        this.resetImage();

        this.shatterCenter = { x: null, y: null };

        this.setVariation(GetValue(config, 'variation', 0.25));
        this.setSamplesPerRing(GetValue(config, 'samplesPerRing', 12));
    }

    setVariation(variation) {
        this.variation = variation;
        return this;
    }

    setSamplesPerRing(samples) {
        this.samplesPerRing = samples;
        return this;
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
            triangleOutput: false,
            variation: this.variation,
            samplesPerRing: this.samplesPerRing
        })
        var vertices = result.vertices;
        var indices = result.indices;

        // Calculate vertex data
        var verticesData = [];
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

        for (var i = 0, cnt = vertices.length; i < cnt; i++) {
            var p = vertices[i];
            var px = p[0];
            var py = p[1];

            verticesData.push({
                g: DistanceSquared(centerX, centerY, px, py),
                x: (px / srcHeight) - vHalfWidth,
                y: (py / srcHeight) - vHalfHeight,
                u: frameU0 + (frameU * (px / srcWidth)),
                v: frameV0 + (frameV * (py / srcHeight))
            })
        }

        // Build face
        for (var i = 0, cnt = indices.length; i < cnt; i += 3) {
            var v0 = verticesData[indices[i + 0]];
            var v1 = verticesData[indices[i + 1]];
            var v2 = verticesData[indices[i + 2]];

            var vert1 = new Vertex(v0.x, -v0.y, 0, v0.u, v0.v);
            var vert2 = new Vertex(v1.x, -v1.y, 0, v1.u, v1.v);
            var vert3 = new Vertex(v2.x, -v2.y, 0, v2.u, v2.v);
            var face = new Face(vert1, vert2, vert3);

            this.vertices.push(vert1, vert2, vert3);
            this.faces.push(face);

            // Sort faces from center
            face.g = Math.min(v0.g, v1.g, v2.g);
        }

        // Sort faces from center
        this.faces.sort(function (faceA, faceB) {
            return faceA.g - faceB.g;
        })

        return this;
    }

    startUpdate() {
        this.ignoreDirtyCache = true;
        return this;
    }

    stopUpdate() {
        this.ignoreDirtyCache = false;
        return this;
    }
}

export default ShatterImage;