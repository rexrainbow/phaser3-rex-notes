var AddChild = function (bob) {
    this.lastAppendedChildren.length = 0;

    if (Array.isArray(bob)) {
        this.children.push(...bob);
        this.lastAppendedChildren.push(...bob);
    } else {
        this.children.push(bob);
        this.lastAppendedChildren.push(bob);
    }

    return this;
}

export default AddChild;