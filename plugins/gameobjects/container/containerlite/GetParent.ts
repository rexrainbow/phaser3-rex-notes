var GetParent = function(gameObject?: any, name?: any) {
    var parent;
    if (name === undefined) {
        if (gameObject.hasOwnProperty('rexContainer')) {
            parent = gameObject.rexContainer.parent;
        }
    } else {
        parent = GetParent(gameObject);
        while (parent?: any) {
            if (parent.name === name) {
                break;
            }
            parent = GetParent(parent);
        }
    }
    return parent;
}

var GetTopmostParent = function(gameObject?: any) {
    var parent = GetParent(gameObject);
    while (parent?: any) {
        gameObject = parent;
        parent = GetParent(parent);
    }
    return gameObject;
}

export { GetParent, GetTopmostParent };