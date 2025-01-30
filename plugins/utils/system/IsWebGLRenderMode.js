import GetRenderer from './GetRenderer.js';

var IsWebGLRenderMode = function (scene) {
    var renderer = GetRenderer(scene);
    if (!renderer) {
        return false;
    }

    return !!renderer.gl;
}

export default IsWebGLRenderMode;