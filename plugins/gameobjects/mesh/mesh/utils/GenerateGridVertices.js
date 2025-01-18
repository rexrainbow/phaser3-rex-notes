import IsPlainObject from '../../../../utils/object/IsPlainObject.js';

var GenerateGridVertices = function (gameObject, columns, rows, sharedVertexMode) {
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
                var vertex = gameObject.createVertex(c / columns, r / rows);
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

                face = gameObject.createFace(vertexTL, vertexBR, vertexBL);
                gameObject.addFace(face);
                faces.push(face);

                face = gameObject.createFace(vertexTL, vertexTR, vertexBR);
                gameObject.addFace(face);
                faces.push(face);

            } else {
                var lx = c / columns,
                    rx = (c + 1) / columns,
                    ty = r / rows,
                    by = (r + 1) / rows;

                vertex0 = gameObject.createVertex(lx, ty); // top-left
                vertex1 = gameObject.createVertex(lx, by); // bottom-left
                vertex2 = gameObject.createVertex(rx, by); // bottom-right
                face = gameObject.createFace(vertex0, vertex1, vertex2);
                gameObject.addFace(face);
                faces.push(face);

                vertex0 = gameObject.createVertex(lx, ty); // top-left
                vertex1 = gameObject.createVertex(rx, by); // bottom-right
                vertex2 = gameObject.createVertex(rx, ty); // top-right
                face = gameObject.createFace(vertex0, vertex1, vertex2);
                gameObject.addFace(face);
                faces.push(face);
            }
        }
    }

    if (sharedVertexMode) {
        gameObject.vertices.sort(function (vertexA, vertexB) {
            if (vertexA.v === vertexB.v) {
                return vertexA.u - vertexB.u;
            } else {
                return vertexA.v - vertexB.v;
            }
        })
    }

    return faces;
}

export default GenerateGridVertices;