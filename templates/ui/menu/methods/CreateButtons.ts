var CreateButtons = function(scene?: any, items?: any, callback?: any, scope?: any) {
    var item;
    var buttons = [],
        button;
    if (items && callback) {
        for (var i = 0, cnt = items.length; i < cnt; i++) {
            item = items[i];
            item.scene = scene;
            if (scope?: any) {
                button = callback.call(scope, item, i, items);
            } else {
                button = callback(item, i, items);
            }
            item.scene = undefined;
            buttons.push(button);
        }
    }

    return buttons;
}

export default CreateButtons;