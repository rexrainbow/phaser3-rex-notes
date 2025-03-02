import UpdateViewMatrix from './UpdateViewMatrix.js';

var Draw = function (drawingContext, calcMatrix) {
    if (!this._model) {
        return;
    }

    var matrix = UpdateViewMatrix(this, calcMatrix);

    var renderer = this.getRenderer();
    renderer.setMvpMatrix(matrix);
    renderer.setRenderState(drawingContext.framebuffer.webGLFramebuffer, drawingContext.state.viewport);
    renderer.drawModel();

    return this;
}

export default Draw;