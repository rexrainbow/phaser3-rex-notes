// import { CubismMatrix44 } from '../../framework/src/math/cubismmatrix44';

var Draw = function (calcMatrix) {
    if (!this._model) {
        return;
    }

    var gameObject = this.parent;

    // Copy projection matrix
    var matrix = this._canvasMatrix.clone();
    matrix.translate(
        this.toLocalX(calcMatrix.getX(0, 0)),
        this.toLocalY(calcMatrix.getY(0, 0))
    );

    // Scale model via scale of Live2dGameObject
    var modelMatrix = this._modelMatrix;
    modelMatrix.scale(gameObject.scaleX, gameObject.scaleY);
    // Translate model via origin of Live2dGameObject
    modelMatrix.translate(0.5 - gameObject.originX, gameObject.originY - 0.5);
    // TODO: Rotate model (SDK does not support)

    // Apply model matrix
    matrix.multiplyByMatrix(modelMatrix);

    var renderer = this.getRenderer();
    renderer.setMvpMatrix(matrix);
    renderer.setRenderState(this._frameBuffer, this._viewportRect);
    renderer.drawModel();

    return this;
}

export default Draw;