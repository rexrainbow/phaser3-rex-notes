var GetParent = function (gameObject) {
    var parent;
    if (gameObject.hasOwnProperty('rexContainer')) {
        parent = gameObject.rexContainer.parent;
    }
    return parent;
}

var GetTopmostParent = function (gameObject) {
    var parent = GetParent(gameObject);
    while (parent) {
        gameObject = parent;
        parent = GetParent(parent);
    }
    return gameObject;
}

export { GetParent, GetTopmostParent };