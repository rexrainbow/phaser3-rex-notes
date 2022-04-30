// import { CubismMatrix44 } from '../../framework/src/math/cubismmatrix44';

var Draw = function (calcMatrix) {
    if (!this._model) {
        return;
    }

    var gameObject = this.parent;
    var globalData = this._globalData;
    var projectionMatrix = globalData.projectionMatrix;

    // Copy from projection matrix
    var matrix = this.viewMatrix;
    matrix.copyFrom(projectionMatrix);
    // Apply rotate
    matrix.rotate(calcMatrix.rotation);
    // Apply translate
    matrix.translate(
        projectionMatrix.toLocalX(calcMatrix.getX(0, 0)),
        projectionMatrix.toLocalY(calcMatrix.getY(0, 0))
    );
    // Apply scale
    matrix.scaleRelative(
        calcMatrix.scaleX,
        calcMatrix.scaleY
    )

    var modelMatrix = this._modelMatrix;
    // Offset for origin
    modelMatrix.translate(
        modelMatrix._width * (0.5 - gameObject.originX),
        modelMatrix._height * (gameObject.originY - 0.5)
    );
    // TODO: Rotate model (SDK does not support)


    // Apply model matrix
    matrix.multiplyByMatrix(modelMatrix);

    var renderer = this.getRenderer();
    renderer.setMvpMatrix(matrix);
    renderer.setRenderState(globalData.frameBuffer, globalData.viewportRect);
    renderer.drawModel();

    return this;
}

export default Draw;