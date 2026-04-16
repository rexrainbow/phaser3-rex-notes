var GetValidChildren = function (parent, includeParent) {
    if (includeParent === undefined) {
        includeParent = true;
    }

    var children = parent.getAllChildren(includeParent ? [parent] : undefined);
    children = children.filter(function (gameObject) {
        return !!gameObject.displayList ||   // At scene's displayList or at a layer
            !!gameObject.parentContainer;  // At a container
    })
    return children;
}

export default GetValidChildren;