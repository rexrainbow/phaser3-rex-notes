import { CubismMatrix44 } from '../../framework/src/math/cubismmatrix44';

var Draw = function (calcMatrix) {
    if (!this._model) {
        return;
    }

    // TODO: Adjust matrix by calcMatrix
    var matrix = new CubismMatrix44(); 
    matrix.multiplyByMatrix(this._modelMatrix);
    this.getRenderer().setMvpMatrix(matrix);
    
    var viewport = [0, 0, 800, 600]; // TODO
    this.getRenderer().setRenderState(this.frameBuffer, viewport);
    this.getRenderer().drawModel();
}

export default Draw;