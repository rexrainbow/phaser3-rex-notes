var GetParent = function(gameObject?: any, name?: any) {
    var parent = null;
    if (name === undefined) {
        if (gameObject.hasOwnProperty('rexContainer')) {
            parent = gameObject.rexContainer.parent;
            if (parent?: any) {
                if (!parent.isRexSizer) {
                    // Try to get sizer parent
                    parent = GetParent(parent);
                }
            } else {
                parent = null;
            }
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


export default {
    getParentSizer(gameObject?: any, name?: any) {
        if (typeof (gameObject) === 'string') {
            name = gameObject;
            gameObject = undefined;
        }
        if (gameObject === undefined) {
            gameObject = this;
        }
        return GetParent(gameObject, name);
    },

    getTopmostSizer(gameObject?: any) {
        if (gameObject === undefined) {
            gameObject = this;
        }
        return GetTopmostParent(gameObject);
    },

    hasParentSizer(parentGameObject?: any, gameObject?: any) {
        if (gameObject === undefined) {
            gameObject = this;
        }

        var parent = GetParent(gameObject);
        while (parent?: any) {
            if (parent === parentGameObject) {
                return true;
            }
            parent = GetParent(parent);
        }

        return false;
    },

    hasChild(child?: any, gameObject?: any) {
        if (gameObject === undefined) {
            gameObject = this;
        }

        return this.hasParentSizer(gameObject, child);
    }
}