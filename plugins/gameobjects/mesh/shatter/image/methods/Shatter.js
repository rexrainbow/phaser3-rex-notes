import RectangleToTriangles from '../../../../../utils/math/rectangletotriangles/fantriangulate/RectangleToTriangles.js';
import { WorldXYToLocalXY } from '../../../mesh/utils/WorldXY.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const DistanceSquared = Phaser.Math.Distance.Squared;

var Shatter = function (centerX, centerY, config) {
    if (IsPlainObject(centerX)) {
        config = centerX;
        centerX = undefined;
        centerY = undefined;
    }

    if (IsPlainObject(config)) {
        if (config.hasOwnProperty('centerX')) {
            centerX = config.centerX;
        }
        if (config.hasOwnProperty('centerY')) {
            centerY = config.centerY;
        }
        if (config.hasOwnProperty('ringRadiusList')) {
            this.setRingRadiusList(config.ringRadiusList);
        }
        if (config.hasOwnProperty('samplesPerRing')) {
            this.setSamplesPerRing(config.samplesPerRing);
        }
        if (config.hasOwnProperty('variation')) {
            this.setVariation(config.variation);
        }
    }

    if (centerX === undefined) {
        centerX = this.width / 2;
        centerY = this.height / 2;
    } else {
        var worldXY = WorldXYToLocalXY(this, centerX, centerY);
        centerX = worldXY.x;
        centerY = worldXY.y;
    }

    this.shatterCenter.x = centerX;
    this.shatterCenter.y = centerY;

    // Clear faces and vertices
    this.clear();
    if ((this.width === 0) || (this.height === 0)) {
        return this;
    }

    centerX /= this.width;
    centerY /= this.height;
    var result = RectangleToTriangles({
        width: 1, height: 1,
        center: { x: centerX, y: centerY },

        triangleOutput: false,
        ringRadiusList: this.ringRadiusList,
        variation: this.variation,
        samplesPerRing: this.samplesPerRing
    })
    var vertices = result.vertices;
    var indices = result.indices;

    // Calculate vertex data
    var vertexData = [];
    for (var i = 0, cnt = vertices.length; i < cnt; i++) {
        var p = vertices[i];
        var px = p[0];
        var py = p[1];

        vertexData.push({
            g: DistanceSquared(centerX, centerY, px, py),
            x: px, y: py,
        })
    }

    // Build face
    for (var i = 0, cnt = indices.length; i < cnt; i += 3) {
        var v0 = vertexData[indices[i + 0]];
        var v1 = vertexData[indices[i + 1]];
        var v2 = vertexData[indices[i + 2]];

        var vertex0 = this.createVertex(v0.x, v0.y);
        var vertex1 = this.createVertex(v1.x, v1.y);
        var vertex2 = this.createVertex(v2.x, v2.y);
        var face = this.createFace(vertex0, vertex1, vertex2);
        this.addFace(face);

        // Sort faces from center
        face.g = Math.min(v0.g, v1.g, v2.g);
    }

    // Sort faces from center
    this.faces.sort(function (faceA, faceB) {
        return faceA.g - faceB.g;
    })

    return this;
}

export default Shatter;