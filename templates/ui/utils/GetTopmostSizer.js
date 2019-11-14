import GetParentSizer from './GetParentSizer.js';

var GetTopmostSizer = function (gameObject) {
    var parent = GetParentSizer(gameObject);
    while (parent) {
        gameObject = parent;
        parent = GetParentSizer(parent);
    }
    return gameObject;
}

export default GetTopmostSizer;