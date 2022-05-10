var UpdateViewMatrix = function (model, calcMatrix) {
    var gameObject = model.parent;
    var projectionMatrix = model._globalData.projectionMatrix;

    // Copy from projection matrix
    var matrix = model.viewMatrix;
    matrix.copyFrom(projectionMatrix);
    // Apply rotate
    matrix.rotate(-calcMatrix.rotationNormalized);
    // Apply scale
    var canvasWidth = projectionMatrix.width,
        canvasHeight = projectionMatrix.height
    var ratio;
    if (canvasWidth > canvasHeight) {
        ratio = model._pixelsPerUnit / canvasHeight;
    } else {
        ratio = model._pixelsPerUnit / canvasWidth;
    }
    matrix.scaleRelative(
        calcMatrix.scaleX * ratio,
        calcMatrix.scaleY * ratio
    );
    // Apply translate
    matrix.translate(
        projectionMatrix.toLocalX(calcMatrix.getX(0, 0)),
        projectionMatrix.toLocalY(calcMatrix.getY(0, 0))
    );


    var modelMatrix = model._modelMatrix;
    // Offset for origin
    // modelMatrix.translate(
    //     modelMatrix._width * (0.5 - gameObject.originX),
    //     modelMatrix._height * (gameObject.originY - 0.5)
    // );
    // Apply model matrix
    matrix.multiplyByMatrix(modelMatrix);

    return matrix;
}

export default UpdateViewMatrix;