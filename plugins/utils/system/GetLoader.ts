import IsSceneObject from './IsSceneObject';

var GetLoader = function(loader?: any) {
    if (IsSceneObject(loader)) {
        var scene = loader;
        return scene.load;
    }

    return loader;
}

export default GetLoader;