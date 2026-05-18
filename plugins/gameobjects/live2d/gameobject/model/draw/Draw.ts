import UpdateViewMatrix from './UpdateViewMatrix';

var Draw = function(drawingContext?: any, calcMatrix?: any) {
    if (!this._model) {
        return;
    }

    var matrix = UpdateViewMatrix(this, calcMatrix);

    var renderer = this.getRenderer();
    renderer.setMvpMatrix(matrix);
    renderer.setRenderState(
        drawingContext.framebuffer.webGLFramebuffer, // null
        drawingContext.state.viewport
    );
    renderer.drawModel();

    return this;
}

export default Draw;