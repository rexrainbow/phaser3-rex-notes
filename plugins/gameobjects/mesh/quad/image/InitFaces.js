import ControlPoint from './ControlPoint.js';

const Vertex = Phaser.Geom.Mesh.Vertex;
const Face = Phaser.Geom.Mesh.Face;

var InitFaces = function (quad) {
    /*
    vertices: 
        0 : top-left
        1 : top-right
        2 : bottom-left
        3 : bottom-right
    */
    var vertices = quad.vertices;
    var faces = quad.faces;
    for (var i = 0; i < 4; i++) {
        vertices.push(new Vertex());
    }
    for (var i = 0, cnt = indices.length; i < cnt; i += 3) {
        var vert1 = vertices[indices[i + 0]];
        var vert2 = vertices[indices[i + 1]];
        var vert3 = vertices[indices[i + 2]];
        faces.push(new Face(vert1, vert2, vert3));
    }

    quad.topLeft = new ControlPoint(quad, vertices[0]);
    quad.topRight = new ControlPoint(quad, vertices[1]);
    quad.bottomLeft = new ControlPoint(quad, vertices[2]);
    quad.bottomRight = new ControlPoint(quad, vertices[3]);
}

const indices = [
    0, 2, 1,
    2, 3, 1
];

export default InitFaces;