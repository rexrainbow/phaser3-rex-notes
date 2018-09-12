var GetSceneObject = function (object) {
    if (isSceneObject(object)) { // object = scene
        return object;
    } else if (object.scene && isSceneObject(object.scene)) { // object = game object
        return object.scene;
    } else if (object.parent && object.parent.scene && isSceneObject(object.parent.scene)) { // parent = bob object
        return object.parent.scene;
    }
}

const SceneKlass = Phaser.Scene;
var isSceneObject = function(object) {
    return (object instanceof SceneKlass);
}

export default GetSceneObject;