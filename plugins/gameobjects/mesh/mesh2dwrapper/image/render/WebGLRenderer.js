import { GameObjects as PhaserGameObjects } from 'phaser';

const Mesh2D = PhaserGameObjects.Mesh2D;

var WebGLRenderer = function (renderer, src, drawingContext, parentMatrix) {
    if (!src) {
        src = this;
    }

    if (src.skipRender()) {
        return;
    }

    Mesh2D.prototype.renderWebGL.call(this, renderer, src, drawingContext, parentMatrix);

    if (src.debugCallback) {
        src.runDebugCallback(drawingContext, parentMatrix);
    }
}

export default WebGLRenderer;
