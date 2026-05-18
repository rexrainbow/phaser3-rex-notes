import GetSceneObject from './GetSceneObject';

var GetRenderer = function(scene?: any) {
    scene = GetSceneObject(scene);
    if (!scene) {
        return null;
    }

    return scene.sys.renderer;
}

export default GetRenderer;