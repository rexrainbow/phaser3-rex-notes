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

    var vertexObjects = [];
    var faceIndices = [];

    for (var r = 0; r <= rows; r++) {
        for (var c = 0; c <= columns; c++) {
            vertexObjects.push(gameObject.createVertexObject(c / columns, r / rows));
        }
    }

    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            var indexTL = (r * (columns + 1)) + c;
            var indexTR = indexTL + 1;
            var indexBL = ((r + 1) * (columns + 1)) + c;
            var indexBR = indexBL + 1;

            faceIndices.push(
                indexTL, indexBR, indexBL,
                indexTL, indexTR, indexBR
            );
        }
    }

    gameObject.setFaceIndices(faceIndices);

    return vertexObjects;
}

export default GenerateGridVertices;
