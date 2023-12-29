import { GetParentSizer } from './GetParentSizer.js';

var RemoveFromParent = function (gameObject, destroyChild) {
    if (!gameObject) {
        return;
    }

    var parent = GetParentSizer(gameObject);

    if (!parent) {
        return;
    }

    parent.remove(gameObject, destroyChild);
}

export default RemoveFromParent;