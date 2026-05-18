import GetRenderer from './GetRenderer';

var IsWebGLRenderMode = function(scene?: any) {
    var renderer = GetRenderer(scene);
    if (!renderer) {
        return false;
    }

    return !!renderer.gl;
}

export default IsWebGLRenderMode;