var GetNeighborObjects = function (child) {
    var parent = child.getParentSizer();
    var children = parent.getElement('items');
    var childIndex = children.indexOf(child);
    return [
        children[childIndex - 1],
        children[childIndex + 1],
    ]
}

export default GetNeighborObjects;