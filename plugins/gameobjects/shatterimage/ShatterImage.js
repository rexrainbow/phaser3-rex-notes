import ShatterRectangleToTriangles from '../../utils/math/triangulate/ShatterRectangleToTriangles.js';

const Mesh = Phaser.GameObjects.Mesh;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const GenerateGridVerts = Phaser.Geom.Mesh.GenerateGridVerts;
const Vertex = Phaser.Geom.Mesh.Vertex;
const Face = Phaser.Geom.Mesh.Face;

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
        this.setOrtho();
        this.hideCCW = false;

        // Generate faces and vertices
        GenerateGridVerts({
            mesh: this,
            texture: this.texture.key, frame: this.frame.name,

            width: this.width / this.height,
            height: 1,

            widthSegments: 1,
            heightSegments: 1,
            flipY: this.frame.source.isRenderTexture
        });
    }

    shatter(center) {
        // Clear faces and vertices
        this.vertices.length = 0;
        this.faces.length = 0;
        this.dirtyCache[9] = -1;

        var width = this.width,
            height = this.height;
        if ((width === 0) || (height === 0)) {
            return this;
        }

        if (center === undefined) {
            center = {
                x: width / 2,
                y: height / 2
            };
        }

        var result = ShatterRectangleToTriangles({
            width: width,
            height: height,
            center: center,
            triangleOutput: false
        })

        var flipY = this.frame.source.isRenderTexture;
        var frameU0 = this.frame.u0;
        var frameU1 = this.frame.u1;
        var frameV0 = (!flipY) ? this.frame.v0 : this.frame.v1;
        var frameV1 = (!flipY) ? this.frame.v1 : this.frame.v0;


        // Generate faces and vertices
        var vertices = result.vertices;
        var indices = result.indices;
        for (var i = 0, cnt = indices.length; i < cnt; i += 3) {
            var p0 = vertices[indices[i + 0]];
            var p1 = vertices[indices[i + 1]];
            var p2 = vertices[indices[i + 2]];

            var vert1 = CreateVertex(p0[0], p0[1], width, height, frameU0, frameU1, frameV0, frameV1);
            var vert2 = CreateVertex(p1[0], p1[1], width, height, frameU0, frameU1, frameV0, frameV1);
            var vert3 = CreateVertex(p2[0], p2[1], width, height, frameU0, frameU1, frameV0, frameV1);
            var face = new Face(vert1, vert2, vert3);

            this.vertices.push(vert1, vert2, vert3);
            this.faces.push(face);
        }

        return this;
    }
}

const Linear = Phaser.Math.Linear;
var CreateVertex = function (x, y, width, height, u0, u1, v0, v1) {
    x /= height;
    y /= height;
    width /= height;
    height = 1;

    var tu = x / width;
    var tv = y / height;
    var u = Linear(u0, u1, tu);
    var v = Linear(v0, v1, tv);
    x = x - (width / 2);
    y = y - (height / 2);
    var vert = new Vertex(x, -y, 0, u, v);
    return vert;
}

export default ShatterImage;