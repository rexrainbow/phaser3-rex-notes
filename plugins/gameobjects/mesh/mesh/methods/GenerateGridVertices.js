import IsPlainObject from '../../../../utils/object/IsPlainObject.js';

var GenerateGridVertices = function (mesh, columns, rows, sharedVertexMode) {
    if (IsPlainObject(columns)) {
        var config = columns;
        columns = config.columns;
        rows = config.rows;
        sharedVertexMode = config.sharedVertexMode;
    }

    if (columns === undefined) {
        columns = 1;
    }
    if (rows === undefined) {
        rows = 1;
    }
    if (sharedVertexMode === undefined) {
        sharedVertexMode = false;
    }

    var faces = [];
    var vertices;

    if (sharedVertexMode) {
        vertices = [];
        for (var r = 0; r <= rows; r++) {
            for (var c = 0; c <= columns; c++) {
                var vertex = mesh.createVertex(c / columns, r / rows);
                vertex.g = vertices.length;
                vertices.push(vertex);
            }
        }
    }

    var vertex0, vertex1, vertex2;
    var face;
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            if (sharedVertexMode) {
                var indexTL = (r * (columns + 1)) + c,
                    indexTR = indexTL + 1,
                    indexBL = ((r + 1) * (columns + 1)) + c,
                    indexBR = indexBL + 1;

                var vertexTL = vertices[indexTL];
                var vertexTR = vertices[indexTR];
                var vertexBL = vertices[indexBL];
                var vertexBR = vertices[indexBR];

                face = mesh.createFace(vertexTL, vertexBL, vertexBR);
                mesh.addFace(face);
                faces.push(face);

                face = mesh.createFace(vertexTL, vertexBR, vertexTR);
                mesh.addFace(face);
                faces.push(face);

            } else {
                var lx = c / columns,
                    rx = (c + 1) / columns,
                    ty = r / rows,
                    by = (r + 1) / rows;

                vertex0 = mesh.createVertex(lx, ty); // top-left
                vertex1 = mesh.createVertex(lx, by); // bottom-left
                vertex2 = mesh.createVertex(rx, by); // bottom-right
                face = mesh.createFace(vertex0, vertex1, vertex2);
                mesh.addFace(face);
                faces.push(face);

                vertex0 = mesh.createVertex(lx, ty); // top-left
                vertex1 = mesh.createVertex(rx, by); // bottom-right
                vertex2 = mesh.createVertex(rx, ty); // top-right
                face = mesh.createFace(vertex0, vertex1, vertex2);
                mesh.addFace(face);
                faces.push(face);
            }
        }
    }

    if (sharedVertexMode) {
        mesh.vertices.sort(function (vertexA, vertexB) {
            return vertexA.g - vertexB.g;
        })

        vertices.forEach(function (vertex) {
            delete vertex.g;
        })
    }

    return faces;
}

export default GenerateGridVertices;