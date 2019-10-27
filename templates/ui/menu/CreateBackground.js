var CreateBackground = function (scene, items, callback, scope) {
    var background;
    if (callback) {
        items.scene = scene;
        if (scope) {
            background = callback.call(scope, scene);
        } else {
            background = callback(scene);
        }
        items.scene = undefined;
    }

    return background;
}

export default CreateBackground;