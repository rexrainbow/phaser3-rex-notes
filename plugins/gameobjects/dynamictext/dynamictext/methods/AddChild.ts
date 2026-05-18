// const RemoveItem = Phaser.Utils.Array.Remove;

var AddChild = function(child?: any, index?: any) {
    var areChildren = Array.isArray(child);

    // Remove existed child(s)
    // RemoveItem(this.children, child);

    if ((index === undefined) || (index === this.children.length)) {
        if (areChildren?: any) {
            this.children.push(...child);
        } else {
            this.children.push(child);
        }
    } else {
        if (areChildren?: any) {
            this.children.splice(index, 0, ...child)
        } else {
            this.children.splice(index, 0, child);
        }
    }

    this.lastAppendedChildren.length = 0;
    if (areChildren?: any) {
        this.lastAppendedChildren.push(...child);
    } else {
        this.lastAppendedChildren.push(child);
    }

    return this;
}

export default AddChild;