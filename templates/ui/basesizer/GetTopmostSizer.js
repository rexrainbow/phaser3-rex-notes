import GetParentSizer from './GetParentSizer.js';

var GetTopmostSizer = function (gameObject) {
    if (gameObject === undefined) {
        gameObject = this;
    }
    var parent = GetParentSizer(gameObject);
    while (parent) {
        gameObject = parent;
        parent = GetParentSizer(parent);
    }
    return gameObject;
}

export default GetTopmostSizer;