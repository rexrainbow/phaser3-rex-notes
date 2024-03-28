import IsSceneObject from './IsSceneObject.js';

var GetLoader = function (loader) {
    if (IsSceneObject) {
        var scene = loader;
        return scene.load;
    }

    return loader;
}

export default GetLoader;