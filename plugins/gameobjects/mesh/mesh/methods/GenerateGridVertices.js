var GenerateGridVertices = function (mesh, columns, rows) {
    if (columns === undefined) { columns = 1; }
    if (rows === undefined) { rows = 1; }

    mesh.clear();

    var faces = [],
        face;
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            var lx = c / columns, rx = (c + 1) / columns;
            var ty = r / rows, by = (r + 1) / rows;
            face = mesh.createFace()
                .setUV(
                    lx, ty,  // top-left
                    lx, by,  // bottom-left
                    rx, by   // bottom-right
                );
            mesh.addFace(face);
            faces.push(face)

            face = mesh.createFace()
                .setUV(
                    lx, ty,  // top-left
                    rx, by,  // bottom-right
                    rx, ty   //top-right
                );
            mesh.addFace(face);
            faces.push(face)
        }
    }

    return faces;
}

export default GenerateGridVertices;