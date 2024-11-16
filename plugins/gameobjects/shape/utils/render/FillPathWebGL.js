/*
shapeData: {
    fillColor, 
    fillAlpha, 
    pathData, 
    pathIndexes  // Earcut(pathData)
}
*/

var Utils = Phaser.Renderer.WebGL.Utils;

var FillPathWebGL = function (drawingContext, submitter, calcMatrix, gameObject, shapeData, alpha, dx, dy) {
    // This is very similar to the FillPath RenderNode, but it already
    // has access to the Earcut indexes, so it doesn't need to calculate them.

    var fillTintColor = Utils.getTintAppendFloatAlpha(shapeData.fillColor, shapeData.fillAlpha * alpha);

    var path = shapeData.pathData;
    var pathIndexes = shapeData.pathIndexes;

    var length = path.length;
    var pathIndex, pointX, pointY, x, y;

    var vertices = Array(length * 2);
    var colors = Array(length);

    var verticesIndex = 0;
    var colorsIndex = 0;

    for (pathIndex = 0; pathIndex < length; pathIndex += 2) {
        pointX = path[pathIndex] - dx;
        pointY = path[pathIndex + 1] - dy;

        // Transform the point.
        x = calcMatrix.getX(pointX, pointY);
        y = calcMatrix.getY(pointX, pointY);

        vertices[verticesIndex++] = x;
        vertices[verticesIndex++] = y;
        colors[colorsIndex++] = fillTintColor;
    }

    submitter.batch(
        drawingContext,
        pathIndexes,
        vertices,
        colors
    );
};

export default FillPathWebGL;
