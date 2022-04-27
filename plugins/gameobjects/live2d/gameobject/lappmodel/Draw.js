import { CubismMatrix44 } from '../../framework/src/math/cubismmatrix44';

var Draw = function () {
    if (!this._model) {
        return;
    }

    var matrix = this._projectionMatrix.clone();    
    matrix.multiplyByMatrix(this._modelMatrix);
    this.getRenderer().setMvpMatrix(matrix);
    this.getRenderer().setRenderState(this._frameBuffer, this._viewportRect);
    this.getRenderer().drawModel();

    return this;
}

export default Draw;