var GetSourceList = function(gameObject?: any) {
    if (gameObject.displayList) {
        return gameObject.displayList;  // At scene's displayList or at a layer
    } else if (gameObject.parentContainer) {
        return gameObject.parentContainer.list;  // At a container
    }

    return null;
}

var GetValidChildren = function(parent?: any, includeParent?: any) {
    if (includeParent === undefined) {
        includeParent = true;
    }

    var children = parent.getAllChildren(includeParent ? [parent] : undefined);
    var parentList = includeParent ? GetSourceList(parent) : null;
    var targetList = parentList;

    children = children.filter(function(gameObject?: any) {
        var sourceList = GetSourceList(gameObject);

        if (!sourceList) {
            return false;
        }

        if (!targetList) {
            targetList = sourceList;
        }

        return (sourceList === targetList);
    })

    return children;
}

export default GetValidChildren;