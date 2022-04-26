import { CubismMatrix44 } from '../../framework/src/math/cubismmatrix44';

var Draw = function (calcMatrix) {
    if (!this._model) {
        return;
    }

    // TODO: Adjust matrix by calcMatrix
    var matrix = new CubismMatrix44();
    matrix.multiplyByMatrix(this._modelMatrix);
    this.getRenderer().setMvpMatrix(matrix);
    this.getRenderer().setRenderState(this._frameBuffer, this._viewport);
    this.getRenderer().drawModel();

    return this;
}

export default Draw;