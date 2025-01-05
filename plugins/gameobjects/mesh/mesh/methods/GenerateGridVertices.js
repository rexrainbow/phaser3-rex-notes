var GenerateGridVertices = function (mesh, columns, rows) {
    if (columns === undefined) { columns = 1; }
    if (rows === undefined) { rows = 1; }

    mesh.clear();

    var faces = [],
        face;
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            var p0x = c / columns, p1x = (c + 1) / columns;
            var p0y = r / rows, p1y = (r + 1) / rows;
            face = mesh.createFace()
                .setUV(
                    /*0*/ p0x, p0y,
                    /*2*/ p0x, p1y,
                    /*3*/ p1x, p1y
                );
            mesh.addFace(face);
            faces.push(face)

            face = mesh.createFace()
                .setUV(
                    /*0*/ p0x, p0y,
                    /*3*/ p1x, p1y,
                    /*1*/ p1x, p0y
                );
            mesh.addFace(face);
            faces.push(face)
        }
    }

    return faces;
}

export default GenerateGridVertices;