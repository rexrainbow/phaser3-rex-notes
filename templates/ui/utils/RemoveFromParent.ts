import { GetParentSizer } from './GetParentSizer';

var RemoveFromParent = function(gameObject?: any, destroyChild?: any) {
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