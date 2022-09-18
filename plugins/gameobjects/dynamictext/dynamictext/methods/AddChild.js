var AddChild = function (bob, index) {
    var isBobArray = Array.isArray(bob);

    if ((index === undefined) || (index === this.children.length)) {
        if (isBobArray) {
            this.children.push(...bob);
        } else {
            this.children.push(bob);
        }
    } else {
        if (isBobArray) {
            this.children.splice(index, 0, ...bob)
        } else {
            this.children.splice(index, 0, bob);
        }
    }

    this.lastAppendedChildren.length = 0;
    if (isBobArray) {
        this.lastAppendedChildren.push(...bob);
    } else {
        this.lastAppendedChildren.push(bob);
    }

    return this;
}

export default AddChild;