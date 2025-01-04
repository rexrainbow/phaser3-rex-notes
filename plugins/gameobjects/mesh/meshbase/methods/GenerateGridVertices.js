var GenerateGridVertices = function (mesh, columns, rows) {
    if (columns === undefined) { columns = 1; }
    if (rows === undefined) { rows = 1; }

    mesh.clear();

    var faces = [],
        face;
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            face = mesh.createFace()
                .setNormalUV(
                    /*0*/ c / columns, r / rows,
                    /*2*/ c / columns, (r + 1) / rows,
                    /*3*/(c + 1) / columns, (r + 1) / rows
                );
            mesh.addFace(face);
            faces.push(face)

            face = mesh.createFace()
                .setNormalUV(
                    /*0*/ c / columns, r / rows,
                    /*3*/(c + 1) / columns, (r + 1) / rows,
                    /*1*/(c + 1) / columns, r / rows
                );
            mesh.addFace(face);
            faces.push(face)
        }
    }

    return faces;
}

export default GenerateGridVertices;