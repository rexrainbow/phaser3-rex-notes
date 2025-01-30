import GetSceneObject from './GetSceneObject.js';

var GetRenderer = function (scene) {
    scene = GetSceneObject(scene);
    if (!scene) {
        return null;
    }

    return scene.sys.renderer;
}

export default GetRenderer;