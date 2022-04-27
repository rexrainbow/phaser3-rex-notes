import { CubismMatrix44 } from '../../framework/src/math/cubismmatrix44';

var Draw = function () {
    if (!this._model) {
        return;
    }

    // Scale model via scale of Live2dGameObject(parent)
    this._modelMatrix.scale(this.parent.scaleX, this.parent.scaleY);

    // Copy projection matrix
    var matrix = this._projectionMatrix.clone();

    // Apply model matrix
    matrix.multiplyByMatrix(this._modelMatrix);

    this.getRenderer().setMvpMatrix(matrix);
    this.getRenderer().setRenderState(this._frameBuffer, this._viewportRect);
    this.getRenderer().drawModel();

    return this;
}

export default Draw;