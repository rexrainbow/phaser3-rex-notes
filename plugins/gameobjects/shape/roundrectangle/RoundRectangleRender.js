import WebGLRenderer from './RoundRectangleWebGLRenderer.js'
import CanvasRenderer from './RoundRectangleCanvasRenderer.js';

const NOOP = Phaser.Utils.NOOP;
var renderWebGL = NOOP;
var renderCanvas = NOOP;

if (WEBGL_RENDERER) {
    renderWebGL = WebGLRenderer;
}

if (CANVAS_RENDERER) {
    renderCanvas = CanvasRenderer;
}

export default {

    renderWebGL: renderWebGL,
    renderCanvas: renderCanvas

};