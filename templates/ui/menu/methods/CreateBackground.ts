var CreateBackground = function(scene?: any, items?: any, callback?: any, scope?: any) {
    var background;
    if (callback?: any) {
        items.scene = scene;
        if (scope?: any) {
            background = callback.call(scope, items);
        } else {
            background = callback(items);
        }
        items.scene = undefined;
    }

    return background;
}

export default CreateBackground;