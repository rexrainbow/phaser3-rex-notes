import WebGLRenderer from './WebGLRenderer.js';
import CanvasRenderer from './CanvasRenderer.js';
import NOOP from '../../../../utils/object/NOOP.js';

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